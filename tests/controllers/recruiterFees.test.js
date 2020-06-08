/* eslint-disable max-len */
const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const models = require('../../models')
const {
  after, afterEach, before, beforeEach, describe, it
} = require('mocha')
const { singleRecruiterFee, recruiterFeeList, postedRecruiterFee } = require('../mocks/recruiterFees')
const {
  getAllRecruiterFees, getRecruiterFeeBySlug, saveNewRecruiterFee, replaceRecruiterFee, patchRecruiterFeeCost, patchRecruiterFeeNotes, deleteRecruiterFee
} = require('../../controllers/recruiterFees')

chai.use(sinonChai)

const { expect } = chai

describe('Controllers - RecruiterFees', () => {
  let response
  let sandbox

  let stubbedCreate
  let stubbedDestroy
  let stubbedFindOne
  let stubbedFindAll
  let stubbedUpdate

  let stubbedSend
  let stubbedSendStatus
  let stubbedStatus
  let stubbedStatusDotSend

  before(() => {
    sandbox = sinon.createSandbox()

    stubbedCreate = sandbox.stub(models.RecruiterFees, 'create')
    stubbedDestroy = sandbox.stub(models.RecruiterFees, 'destroy')
    stubbedFindAll = sandbox.stub(models.RecruiterFees, 'findAll')
    stubbedFindOne = sandbox.stub(models.RecruiterFees, 'findOne')
    stubbedUpdate = sandbox.stub(models.RecruiterFees, 'update')

    stubbedSend = sandbox.stub()
    stubbedSendStatus = sandbox.stub()
    stubbedStatusDotSend = sandbox.stub()
    stubbedStatus = sandbox.stub()

    response = {
      send: stubbedSend,
      sendStatus: stubbedSendStatus,
      status: stubbedStatus,
    }
  })

  beforeEach(() => {
    stubbedStatus.returns({ send: stubbedStatusDotSend })
  })

  afterEach(() => {
    sandbox.reset()
  })

  after(() => {
    sandbox.restore()
  })

  describe('getAllRecruiterFees', () => {
    it('retrieves a list of recruiter fees from the database and calls response.send() with the list', async () => {
      stubbedFindAll.returns(recruiterFeeList)

      await getAllRecruiterFees({}, response)

      expect(stubbedFindAll).to.have.callCount(1)
      expect(stubbedSend).to.have.been.calledWith(recruiterFeeList)
    })

    it('returns a 404 status and sends a message when the list of recruiter fees is empty', async () => {
      stubbedFindAll.returns([])

      await getAllRecruiterFees({}, response)

      expect(stubbedFindAll).to.have.callCount(1)
      expect(stubbedStatus).to.have.been.calledWith(404)
      expect(stubbedStatusDotSend).to.have.been.calledWith('No recruiter fees found')
    })

    it('returns a 500 status and sends a message when an error occurs retrieving the recruiter fees', async () => {
      stubbedFindAll.throws('ERROR!')

      await getAllRecruiterFees({}, response)

      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to retrieve recruiter fees list, please try again')
    })
  })

  describe('getRecruiterFeeBySlug', () => {
    it('retrieves the recruiter fee associated with the provided slug from the database and calls response.send() with it', async () => {
      const request = { params: { slug: 'glassdoor' } }

      stubbedFindOne.returns(singleRecruiterFee)

      await getRecruiterFeeBySlug(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({ where: { slug: 'glassdoor' } })
      expect(stubbedSend).to.have.been.calledWith(singleRecruiterFee)
    })

    it('returns a 404 status and sends a message when no recruiter fee is found', async () => {
      const request = { params: { slug: 'glassdoor' } }

      stubbedFindOne.returns(null)

      await getRecruiterFeeBySlug(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({ where: { slug: 'glassdoor' } })
      expect(stubbedStatus).to.have.been.calledWith(404)
      expect(stubbedStatusDotSend).to.have.been.calledWith('No recruiter fee found with a slug of "glassdoor"')
    })

    it('returns a 500 status and sends a message when an error occurs retrieving the recruiter fee by slug', async () => {
      const request = { params: { slug: 'glassdoor' } }

      stubbedFindOne.throws('ERROR!')

      await getRecruiterFeeBySlug(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({ where: { slug: 'glassdoor' } })
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to retrieve recruiter fee, please try again')
    })
  })

  describe('saveNewRecruiterFee', () => {
    it('accepts new recruiter fee details and saves them as a new recruiter fee in the database, returning the saved record with a 201 status', async () => {
      const request = { body: postedRecruiterFee }

      stubbedCreate.returns(singleRecruiterFee)

      await saveNewRecruiterFee(request, response)

      expect(stubbedCreate).to.have.been.calledWith(postedRecruiterFee)
      expect(stubbedStatus).to.have.been.calledWith(201)
      expect(stubbedStatusDotSend).to.have.been.calledWith(postedRecruiterFee)
    })

    it('returns a 500 status and sends a message when an error occurs saving the new recruiter fee', async () => {
      const request = { body: postedRecruiterFee }

      stubbedCreate.throws('ERROR!')

      await saveNewRecruiterFee(request, response)

      expect(stubbedCreate).to.have.been.calledWith(postedRecruiterFee)
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to save recruiter fee, please try again')
    })
  })

  describe('replaceRecruiterFee', () => {
    it('accepts new recruiter fee details and replaces the recruiter fee referenced by slug in the route with the new one in the database, returning the new recruiter fee', async () => {
      const request = { params: { slug: 'glassdoor' }, body: postedRecruiterFee }

      stubbedUpdate.returns(postedRecruiterFee)

      await replaceRecruiterFee(request, response)

      expect(stubbedUpdate).to.have.been.calledWith(postedRecruiterFee, { where: { slug: 'glassdoor' } })
      expect(stubbedSend).to.have.been.calledWith(postedRecruiterFee)
    })

    it('returns a 500 status and sends a message when an error occurs replacing the referenced recruiter fee', async () => {
      const request = { params: { slug: '' }, body: {} }

      stubbedUpdate.returns(Promise.reject('Failed Update'))

      await replaceRecruiterFee(request, response)

      expect(stubbedUpdate).to.have.been.calledWith({
        service: undefined, cost: undefined, notes: undefined, slug: undefined
      }, { where: { slug: '' } })
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to replace recruiter fee, please try again')
    })
  })

  describe('patchRecruiterFeeCost', () => {
    it('accepts a new recruiter fee cost and assigns it to the recruiter fee referenced by slug in the route, returning the patched recruiter fee', async () => {
      const request = { params: { slug: 'glassdoor' }, body: { cost: 0 } }

      stubbedUpdate.returns(postedRecruiterFee)

      await patchRecruiterFeeCost(request, response)

      expect(stubbedUpdate).to.have.been.calledWith({ cost: 0 }, { where: { slug: 'glassdoor' } })
      expect(stubbedSend).to.have.been.calledWith({ ...postedRecruiterFee, cost: 0 })
    })

    it('returns a 500 status and sends a message when an error occurs patching the recruiter fee cost', async () => {
      const request = { params: { slug: '' }, body: {} }

      stubbedUpdate.returns(Promise.reject('Failed Update'))

      await patchRecruiterFeeCost(request, response)

      expect(stubbedUpdate).to.have.been.calledWith({ cost: undefined }, { where: { slug: '' } })
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to patch recruiter fee cost, please try again')
    })
  })

  describe('patchRecruiterFeeNotes', () => {
    it('accepts a new recruiter fee notes value and assigns it to the recruiter fee referenced by slug in the route, returning the patched recruiter fee', async () => {
      const request = { params: { slug: 'glassdoor' }, body: { notes: '' } }

      stubbedUpdate.returns(postedRecruiterFee)

      await patchRecruiterFeeNotes(request, response)

      expect(stubbedUpdate).to.have.been.calledWith({ notes: '' }, { where: { slug: 'glassdoor' } })
      expect(stubbedSend).to.have.been.calledWith({ ...postedRecruiterFee, notes: '' })
    })

    it('returns a 500 status and sends a message when an error occurs patching the recruiter fee notes', async () => {
      const request = { params: { slug: '' }, body: {} }

      stubbedUpdate.returns(Promise.reject('Failed Update'))

      await patchRecruiterFeeNotes(request, response)

      expect(stubbedUpdate).to.have.been.calledWith({ notes: undefined }, { where: { slug: '' } })
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to patch recruiter fee notes, please try again')
    })
  })

  describe('deleteRecruiterFee', () => {
    it('Deletes a recruiter fee referenced by slug in the route from the database and calls sendStatus(204)', async () => {
      const request = { params: { slug: 'glassdoor' } }

      stubbedDestroy.returns(1)

      await deleteRecruiterFee(request, response)

      expect(stubbedDestroy).to.have.been.calledWith({ where: { slug: 'glassdoor' } })
      expect(stubbedSendStatus).to.have.been.calledWith(204)
    })


    it('returns a 404 status and sends a message when no recruiter fee is found with the slug in the route', async () => {
      const request = { params: { slug: '' } }

      stubbedDestroy.returns(0)

      await deleteRecruiterFee(request, response)

      expect(stubbedDestroy).to.have.been.calledWith({ where: { slug: '' } })
      expect(stubbedStatus).to.have.been.calledWith(404)
      expect(stubbedStatusDotSend).to.have.been.calledWith('No recruiter fee found with a slug of ""')
    })

    it('returns a 500 status when an error occurs deleting the recruiter fee', async () => {
      const request = { params: { slug: 'glassdoor' } }

      stubbedDestroy.throws('ERROR!')

      await deleteRecruiterFee(request, response)

      expect(stubbedDestroy).to.have.been.calledWith({ where: { slug: 'glassdoor' } })
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to delete recruiter fee, please try again')
    })
  })
})
