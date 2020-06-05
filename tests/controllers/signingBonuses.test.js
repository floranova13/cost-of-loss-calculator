/* eslint-disable max-len */
const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const {
  after, afterEach, before, beforeEach, describe, it,
} = require('mocha')
const models = require('../../models')
const { singleSigningBonus, signingBonusList, postedSigningBonus } = require('../mocks/signingBonuses')
const {
  getAllSigningBonuses, getSigningBonusBySlug, saveNewSigningBonus, replaceSigningBonus, patchSigningBonusCost, patchSigningBonusNotes, deleteSigningBonus,
} = require('../../controllers/signingBonuses')

chai.use(sinonChai)

const { expect } = chai

describe('Controllers - SigningBonuses', () => {
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

    stubbedCreate = sandbox.stub(models.SigningBonuses, 'create')
    stubbedDestroy = sandbox.stub(models.SigningBonuses, 'destroy')
    stubbedFindAll = sandbox.stub(models.SigningBonuses, 'findAll')
    stubbedFindOne = sandbox.stub(models.SigningBonuses, 'findOne')
    stubbedUpdate = sandbox.stub(models.SigningBonuses, 'update')

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

  describe('getAllSigningBonuses', () => {
    it('retrieves a list of signing bonuses from the database and calls response.send() with the list', async () => {
      stubbedFindAll.returns(signingBonusList)

      await getAllSigningBonuses({}, response)

      expect(stubbedFindAll).to.have.callCount(1)
      expect(stubbedSend).to.have.been.calledWith(signingBonusList)
    })

    it('returns a 404 status and sends a message when the list of signing bonuses is empty', async () => {
      stubbedFindAll.returns([])

      await getAllSigningBonuses({}, response)

      expect(stubbedFindAll).to.have.callCount(1)
      expect(stubbedStatus).to.have.been.calledWith(404)
      expect(stubbedStatusDotSend).to.have.been.calledWith('No signing bonuses found')
    })

    it('returns a 500 status and sends a message when an error occurs retrieving the signing bonuses', async () => {
      stubbedFindAll.throws('ERROR!')

      await getAllSigningBonuses({}, response)

      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to retrieve signing bonuses list, please try again')
    })
  })

  describe('getSigningBonusBySlug', () => {
    it('retrieves the signing bonuses associated with the provided slug from the database and calls response.send() with it', async () => {
      const request = { params: { slug: 'glassdoor' } }

      stubbedFindOne.returns(singleSigningBonus)

      await getSigningBonusBySlug(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({ where: { slug: 'glassdoor' } })
      expect(stubbedSend).to.have.been.calledWith(singleSigningBonus)
    })

    it('returns a 404 status and sends a message when no signing bonuses is found', async () => {
      const request = { params: { slug: 'glassdoor' } }

      stubbedFindOne.returns(null)

      await getSigningBonusBySlug(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({ where: { slug: 'glassdoor' } })
      expect(stubbedStatus).to.have.been.calledWith(404)
      expect(stubbedStatusDotSend).to.have.been.calledWith('No signing bonuses found with a slug of "glassdoor"')
    })

    it('returns a 500 status and sends a message when an error occurs retrieving the signing bonus by slug', async () => {
      const request = { params: { slug: 'glassdoor' } }

      stubbedFindOne.throws('ERROR!')

      await getSigningBonusBySlug(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({ where: { slug: 'glassdoor' } })
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to retrieve signing bonus, please try again')
    })
  })

  describe('saveNewSigningBonus', () => {
    it('accepts new signing bonus details and saves them as a new signing bonus in the database, returning the saved record with a 201 status', async () => {
      const request = { body: postedSigningBonus }

      stubbedCreate.returns(singleSigningBonus)

      await saveNewSigningBonus(request, response)

      expect(stubbedCreate).to.have.been.calledWith(postedSigningBonus)
      expect(stubbedStatus).to.have.been.calledWith(201)
      expect(stubbedStatusDotSend).to.have.been.calledWith(postedSigningBonus)
    })

    it('returns a 500 status and sends a message when an error occurs saving the new signing bonus', async () => {
      const request = { body: postedSigningBonus }

      stubbedCreate.throws('ERROR!')

      await saveNewSigningBonus(request, response)

      expect(stubbedCreate).to.have.been.calledWith(postedSigningBonus)
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to save signing bonus, please try again')
    })
  })

  describe('replaceSigningBonus', () => {
    it('accepts new signing bonus details and replaces the signing bonus referenced by slug in the route with the new one in the database, returning the new signing bonus', async () => {
      const request = { params: { slug: 'glassdoor' }, body: postedSigningBonus }

      stubbedUpdate.returns(postedSigningBonus)

      await replaceSigningBonus(request, response)

      expect(stubbedUpdate).to.have.been.calledWith(postedSigningBonus, { where: { slug: 'glassdoor' } })
      expect(stubbedSend).to.have.been.calledWith(postedSigningBonus)
    })

    it('returns a 500 status and sends a message when an error occurs replacing the referenced signing bonus', async () => {
      const request = { params: { slug: '' }, body: { } }

      stubbedUpdate.returns(Promise.reject(new Error('ERROR')))

      await replaceSigningBonus(request, response)

      expect(stubbedUpdate).to.have.been.calledWith({
        service: undefined, cost: undefined, notes: undefined, slug: undefined,
      }, { where: { slug: '' } })
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to replace signing bonus, please try again')
    })
  })

  describe('patchSigningBonusCost', () => {
    it('accepts a new signing bonus cost and assigns it to the signing bonus referenced by slug in the route, returning the patched signing bonus', async () => {
      const request = { params: { slug: 'glassdoor' }, body: { cost: 0 } }

      stubbedUpdate.returns(postedSigningBonus)

      await patchSigningBonusCost(request, response)

      expect(stubbedUpdate).to.have.been.calledWith({ cost: 0 }, { where: { slug: 'glassdoor' } })
      expect(stubbedSend).to.have.been.calledWith({ ...postedSigningBonus, cost: 0 })
    })

    it('returns a 500 status and sends a message when an error occurs patching the signing bonus cost', async () => {
      const request = { params: { slug: '' }, body: { } }

      stubbedUpdate.returns(Promise.reject('Failed Update'))

      await patchSigningBonusCost(request, response)

      expect(stubbedUpdate).to.have.been.calledWith({ cost: undefined }, { where: { slug: '' } })
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to patch signing bonus cost, please try again')
    })
  })

  describe('patchSigningBonusNotes', () => {
    it('accepts a new signing bonus notes value and assigns it to the signing bonus referenced by slug in the route, returning the patched signing bonus', async () => {
      const request = { params: { slug: 'glassdoor' }, body: { notes: '' } }

      stubbedUpdate.returns(postedSigningBonus)

      await patchSigningBonusNotes(request, response)

      expect(stubbedUpdate).to.have.been.calledWith({ notes: '' }, { where: { slug: 'glassdoor' } })
      expect(stubbedSend).to.have.been.calledWith({ ...postedSigningBonus, notes: '' })
    })

    it('returns a 500 status and sends a message when an error occurs patching the signing bonus notes', async () => {
      const request = { params: { slug: '' }, body: { } }

      stubbedUpdate.returns(Promise.reject('Failed Update'))

      await patchSigningBonusNotes(request, response)

      expect(stubbedUpdate).to.have.been.calledWith({ notes: undefined }, { where: { slug: '' } })
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to patch signing bonus notes, please try again')
    })
  })

  describe('deleteSigningBonus', () => {
    it('Deletes a signing bonus referenced by slug in the route from the database and calls sendStatus(200)', async () => {
      const request = { params: { slug: 'glassdoor' } }

      stubbedDestroy.returns(1)

      await deleteSigningBonus(request, response)

      expect(stubbedDestroy).to.have.been.calledWith({ where: { slug: 'glassdoor' } })
      expect(stubbedSendStatus).to.have.been.calledWith(200)
    })


    it('returns a 404 status and sends a message when no signing bonus is found with the slug in the route', async () => {
      const request = { params: { slug: '' } }

      stubbedDestroy.returns(0)

      await deleteSigningBonus(request, response)

      expect(stubbedDestroy).to.have.been.calledWith({ where: { slug: '' } })
      expect(stubbedStatus).to.have.been.calledWith(404)
      expect(stubbedStatusDotSend).to.have.been.calledWith('No signing bonus found with a slug of ""')
    })

    it('returns a 500 status when an error occurs deleting the signing bonus', async () => {
      const request = { params: { slug: 'glassdoor' } }

      stubbedDestroy.throws('ERROR!')

      await deleteSigningBonus(request, response)

      expect(stubbedDestroy).to.have.been.calledWith({ where: { slug: 'glassdoor' } })
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to delete signing bonus, please try again')
    })
  })
})
