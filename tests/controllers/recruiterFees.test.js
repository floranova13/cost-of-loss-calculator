/* eslint-disable max-len */
import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import {
  after, afterEach, before, beforeEach, describe, it,
} from 'mocha'
import models from '../../models'
import { singleRecruiterFee, recruiterFeeList, postedRecruiterFee } from '../mocks/recruiterFees'
import {
  getAllRecruiterFees, getRecruiterFeeById, saveNewRecruiterFee, patchRecruiterFeeFee, patchRecruiterFeeSalary, deleteRecruiterFee,
} from '../../controllers/recruiterFees'

chai.use(sinonChai)

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

    it('returns a 500 status and sends a message when an error occurs retrieving the recruiter fees', async () => {
      stubbedFindAll.throws('ERROR!')

      await getAllRecruiterFees({}, response)

      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to retrieve recruiter fee list, please try again')
    })
  })

  describe('getRecruiterFeeById', () => {
    it('retrieves the recruiter fee associated with the provided id from the database and calls response.send() with it', async () => {
      const request = { params: { id: '1' } }

      stubbedFindOne.returns(singleRecruiterFee)

      await getRecruiterFeeById(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({ where: { id: '1' } })
      expect(stubbedSend).to.have.been.calledWith(singleRecruiterFee)
    })

    it('returns a 404 status and sends a message when no recruiter fee is found', async () => {
      const request = { params: { id: -1 } }

      stubbedFindOne.returns(null)

      await getRecruiterFeeById(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({ where: { id: -1 } })
      expect(stubbedStatus).to.have.been.calledWith(404)
      expect(stubbedStatusDotSend).to.have.been.calledWith('No recruiter fee with the id of "-1" found')
    })

    it('returns a 500 status and sends a message when an error occurs retrieving the recruiter fee by id', async () => {
      const request = { params: { id: '1' } }

      stubbedFindOne.throws('ERROR!')

      await getRecruiterFeeById(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({ where: { id: '1' } })
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

  describe('patchRecruiterFeeFee', () => {
    it('accepts a new recruiter fee fee and assigns it to the recruiter fee referenced by id in the route, returning the patched recruiter fee', async () => {
      const request = { params: { id: '1' }, body: { fee: 0 } }

      await patchRecruiterFeeFee(request, response)

      expect(stubbedUpdate).to.have.been.calledWith({ fee: 0 }, { where: { id: '1' } })
      expect(stubbedSendStatus).to.have.been.calledWith(200)
    })

    it('returns a 500 status and sends a message when an error occurs patching the recruiter fee fee', async () => {
      const request = { params: { id: '1' }, body: { } }

      stubbedUpdate.returns(Promise.reject(new Error('ERROR!')))

      await patchRecruiterFeeFee(request, response)

      expect(stubbedUpdate).to.have.been.calledWith({ fee: undefined }, { where: { id: '1' } })
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to patch recruiter fee fee, please try again')
    })
  })

  describe('patchRecruiterFeeSalary', () => {
    it('accepts a new recruiter fee salary value and assigns it to the recruiter fee referenced by id in the route, returning the patched recruiter fee', async () => {
      const request = { params: { id: '1' }, body: { salary: '' } }

      await patchRecruiterFeeSalary(request, response)

      expect(stubbedUpdate).to.have.been.calledWith({ salary: '' }, { where: { id: '1' } })
      expect(stubbedSendStatus).to.have.been.calledWith(200)
    })

    it('returns a 500 status and sends a message when an error occurs patching the recruiter fee salary', async () => {
      const request = { params: { id: '1' }, body: { } }

      stubbedUpdate.returns(Promise.reject(new Error('ERROR!')))

      await patchRecruiterFeeSalary(request, response)

      expect(stubbedUpdate).to.have.been.calledWith({ salary: undefined }, { where: { id: '1' } })
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to patch recruiter fee salary, please try again')
    })
  })

  describe('deleteRecruiterFee', () => {
    it('Deletes a recruiter fee referenced by id in the route from the database and calls sendStatus(200)', async () => {
      const request = { params: { id: '1' } }

      stubbedDestroy.returns(1)

      await deleteRecruiterFee(request, response)

      expect(stubbedDestroy).to.have.been.calledWith({ where: { id: '1' } })
      expect(stubbedSendStatus).to.have.been.calledWith(200)
    })


    it('returns a 404 status and sends a message when no recruiter fee is found with the id in the route', async () => {
      const request = { params: { id: '1' } }

      stubbedDestroy.returns(0)

      await deleteRecruiterFee(request, response)

      expect(stubbedDestroy).to.have.been.calledWith({ where: { id: '1' } })
      expect(stubbedStatus).to.have.been.calledWith(404)
      expect(stubbedStatusDotSend).to.have.been.calledWith('No recruiter fee with that id to delete')
    })

    it('returns a 500 status when an error occurs deleting the recruiter fee', async () => {
      const request = { params: { id: '1' } }

      stubbedDestroy.throws('ERROR!')

      await deleteRecruiterFee(request, response)

      expect(stubbedDestroy).to.have.been.calledWith({ where: { id: '1' } })
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to delete recruiter fee, please try again')
    })
  })
})
