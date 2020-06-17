/* eslint-disable max-len */
import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import {
  after, afterEach, before, beforeEach, describe, it,
} from 'mocha'
import models from '../../models'
import { singleSigningBonus, signingBonusList, postedSigningBonus } from '../mocks/signingBonuses'
import {
  getAllSigningBonuses, getSigningBonusById, saveNewSigningBonus, patchSigningBonusAmount, deleteSigningBonus,
} from '../../controllers/signingBonuses'

chai.use(sinonChai)

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

    it('returns a 500 status and sends a message when an error occurs retrieving the signing bonuses', async () => {
      stubbedFindAll.throws('ERROR!')

      await getAllSigningBonuses({}, response)

      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to retrieve signing bonus list, please try again')
    })
  })

  describe('getSigningBonusById', () => {
    it('retrieves the signing bonuses associated with the provided id from the database and calls response.send() with it', async () => {
      const request = { params: { id: 1 } }

      stubbedFindOne.returns(singleSigningBonus)

      await getSigningBonusById(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({ where: { id: 1 } })
      expect(stubbedSend).to.have.been.calledWith(singleSigningBonus)
    })

    it('returns a 404 status and sends a message when no signing bonuses is found', async () => {
      const request = { params: { id: -1 } }

      stubbedFindOne.returns(null)

      await getSigningBonusById(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({ where: { id: -1 } })
      expect(stubbedStatus).to.have.been.calledWith(404)
      expect(stubbedStatusDotSend).to.have.been.calledWith('No signing bonus with the id of "-1" found')
    })

    it('returns a 500 status and sends a message when an error occurs retrieving the signing bonus by id', async () => {
      const request = { params: { id: 1 } }

      stubbedFindOne.throws('ERROR!')

      await getSigningBonusById(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({ where: { id: 1 } })
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

  describe('patchSigningBonusAmount', () => {
    it('accepts a new signing bonus amount and assigns it to the signing bonus referenced by id in the route, returning the patched signing bonus', async () => {
      const request = { params: { id: 1 }, body: { amount: 0 } }

      await patchSigningBonusAmount(request, response)

      expect(stubbedUpdate).to.have.been.calledWith({ amount: 0 }, { where: { id: 1 } })
      expect(stubbedSendStatus).to.have.been.calledWith(200)
    })

    it('returns a 500 status and sends a message when an error occurs patching the signing bonus amount', async () => {
      const request = { params: { id: '' }, body: { } }

      stubbedUpdate.returns(Promise.reject(new Error('ERROR!')))

      await patchSigningBonusAmount(request, response)

      expect(stubbedUpdate).to.have.been.calledWith({ amount: undefined }, { where: { id: '' } })
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to patch signing bonus amount, please try again')
    })
  })

  describe('deleteSigningBonus', () => {
    it('Deletes a signing bonus referenced by id in the route from the database and calls sendStatus(200)', async () => {
      const request = { params: { id: 1 } }

      stubbedDestroy.returns(1)

      await deleteSigningBonus(request, response)

      expect(stubbedDestroy).to.have.been.calledWith({ where: { id: 1 } })
      expect(stubbedSendStatus).to.have.been.calledWith(200)
    })


    it('returns a 404 status and sends a message when no signing bonus is found with the id in the route', async () => {
      const request = { params: { id: '' } }

      stubbedDestroy.returns(0)

      await deleteSigningBonus(request, response)

      expect(stubbedDestroy).to.have.been.calledWith({ where: { id: '' } })
      expect(stubbedStatus).to.have.been.calledWith(404)
      expect(stubbedStatusDotSend).to.have.been.calledWith('No signing bonus with that id to delete')
    })

    it('returns a 500 status when an error occurs deleting the signing bonus', async () => {
      const request = { params: { id: 1 } }

      stubbedDestroy.throws('ERROR!')

      await deleteSigningBonus(request, response)

      expect(stubbedDestroy).to.have.been.calledWith({ where: { id: 1 } })
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to delete signing bonus, please try again')
    })
  })
})
