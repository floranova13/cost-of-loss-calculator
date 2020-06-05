/* eslint-disable max-len */
const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const {
  after, afterEach, before, beforeEach, describe, it,
} = require('mocha')
const models = require('../../models')
const { singleJobPosting, jobPostingList, postedJobPosting } = require('../mocks/jobPostings')
const {
  getAllJobPostings, getJobPostingBySlug, saveNewJobPosting, replaceJobPosting, patchJobPostingCost, patchJobPostingNotes, deleteJobPosting,
} = require('../../controllers/jobPostings')

chai.use(sinonChai)

const { expect } = chai

describe('Controllers - JobPostings', () => {
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

    stubbedCreate = sandbox.stub(models.JobPostings, 'create')
    stubbedDestroy = sandbox.stub(models.JobPostings, 'destroy')
    stubbedFindAll = sandbox.stub(models.JobPostings, 'findAll')
    stubbedFindOne = sandbox.stub(models.JobPostings, 'findOne')
    stubbedUpdate = sandbox.stub(models.JobPostings, 'update')

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

  describe('getAllJobPostings', () => {
    it('retrieves a list of job postings from the database and calls response.send() with the list', async () => {
      stubbedFindAll.returns(jobPostingList)

      await getAllJobPostings({}, response)

      expect(stubbedFindAll).to.have.callCount(1)
      expect(stubbedSend).to.have.been.calledWith(jobPostingList)
    })

    it('returns a 404 status and sends a message when the list of job postings is empty', async () => {
      stubbedFindAll.returns([])

      await getAllJobPostings({}, response)

      expect(stubbedFindAll).to.have.callCount(1)
      expect(stubbedStatus).to.have.been.calledWith(404)
      expect(stubbedStatusDotSend).to.have.been.calledWith('No job postings found')
    })

    it('returns a 500 status and sends a message when an error occurs retrieving the job postings', async () => {
      stubbedFindAll.throws('ERROR!')

      await getAllJobPostings({}, response)

      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to retrieve job postings list, please try again')
    })
  })

  describe('getJobPostingBySlug', () => {
    it('retrieves the job posting associated with the provided id from the database and calls response.send() with it', async () => {
      const request = { params: { id: '1' } }

      stubbedFindOne.returns(singleJobPosting)

      await getJobPostingBySlug(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({ where: { id: '1' } })
      expect(stubbedSend).to.have.been.calledWith(singleJobPosting)
    })

    it('returns a 404 status and sends a message when no job posting is found', async () => {
      const request = { params: { id: '1' } }

      stubbedFindOne.returns(null)

      await getJobPostingBySlug(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({ where: { id: '1' } })
      expect(stubbedStatus).to.have.been.calledWith(404)
      expect(stubbedStatusDotSend).to.have.been.calledWith('No job posting found with a id of "1"')
    })

    it('returns a 500 status and sends a message when an error occurs retrieving the job posting by id', async () => {
      const request = { params: { id: '1' } }

      stubbedFindOne.throws('ERROR!')

      await getJobPostingBySlug(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({ where: { id: '1' } })
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to retrieve job posting, please try again')
    })
  })

  describe('saveNewJobPosting', () => {
    it('accepts new job posting details and saves them as a new job posting in the database, returning the saved record with a 201 status', async () => {
      const request = { body: postedJobPosting }

      stubbedCreate.returns(singleJobPosting)

      await saveNewJobPosting(request, response)

      expect(stubbedCreate).to.have.been.calledWith(postedJobPosting)
      expect(stubbedStatus).to.have.been.calledWith(201)
      expect(stubbedStatusDotSend).to.have.been.calledWith(postedJobPosting)
    })

    it('returns a 500 status and sends a message when an error occurs saving the new job posting', async () => {
      const request = { body: postedJobPosting }

      stubbedCreate.throws('ERROR!')

      await saveNewJobPosting(request, response)

      expect(stubbedCreate).to.have.been.calledWith(postedJobPosting)
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to save job posting, please try again')
    })
  })

  describe('replaceJobPosting', () => {
    it('accepts new job posting details and replaces the job posting referenced by id in the route with the new one in the database, returning the new job posting', async () => {
      const request = { params: { id: '1' }, body: postedJobPosting }

      stubbedUpdate.returns(postedJobPosting)

      await replaceJobPosting(request, response)

      expect(stubbedUpdate).to.have.been.calledWith(postedJobPosting, { where: { id: '1' } })
      expect(stubbedSend).to.have.been.calledWith(postedJobPosting)
    })

    it('returns a 500 status and sends a message when an error occurs replacing the referenced job posting', async () => {
      const request = { params: { id: '' }, body: { } }

      stubbedUpdate.returns(Promise.reject(new Error('ERROR!')))

      await replaceJobPosting(request, response)

      expect(stubbedUpdate).to.have.been.calledWith({
        service: undefined, cost: undefined, notes: undefined, id: undefined,
      }, { where: { id: '' } })
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to replace job posting, please try again')
    })
  })

  describe('patchJobPostingCost', () => {
    it('accepts a new job posting cost and assigns it to the job posting referenced by id in the route, returning the patched job posting', async () => {
      const request = { params: { id: '1' }, body: { cost: 0 } }

      stubbedUpdate.returns(postedJobPosting)

      await patchJobPostingCost(request, response)

      expect(stubbedUpdate).to.have.been.calledWith({ cost: 0 }, { where: { id: '1' } })
      expect(stubbedSend).to.have.been.calledWith({ ...postedJobPosting, cost: 0 })
    })

    it('returns a 500 status and sends a message when an error occurs patching the job posting cost', async () => {
      const request = { params: { id: '' }, body: { } }

      stubbedUpdate.returns(Promise.reject(new Error('ERROR!')))

      await patchJobPostingCost(request, response)

      expect(stubbedUpdate).to.have.been.calledWith({ cost: undefined }, { where: { id: '' } })
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to patch job posting cost, please try again')
    })
  })

  describe('patchJobPostingNotes', () => {
    it('accepts a new job posting notes value and assigns it to the job posting referenced by id in the route, returning the patched job posting', async () => {
      const request = { params: { id: '1' }, body: { notes: '' } }

      stubbedUpdate.returns(postedJobPosting)

      await patchJobPostingNotes(request, response)

      expect(stubbedUpdate).to.have.been.calledWith({ notes: '' }, { where: { id: '1' } })
      expect(stubbedSend).to.have.been.calledWith({ ...postedJobPosting, notes: '' })
    })

    it('returns a 500 status and sends a message when an error occurs patching the job posting notes', async () => {
      const request = { params: { id: '' }, body: { } }

      stubbedUpdate.returns(Promise.reject(new Error('ERROR!')))

      await patchJobPostingNotes(request, response)

      expect(stubbedUpdate).to.have.been.calledWith({ notes: undefined }, { where: { id: '' } })
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to patch job posting notes, please try again')
    })
  })

  describe('deleteJobPosting', () => {
    it('Deletes a job posting referenced by id in the route from the database and calls sendStatus(200)', async () => {
      const request = { params: { id: '1' } }

      stubbedDestroy.returns(1)

      await deleteJobPosting(request, response)

      expect(stubbedDestroy).to.have.been.calledWith({ where: { id: '1' } })
      expect(stubbedSendStatus).to.have.been.calledWith(200)
    })


    it('returns a 404 status and sends a message when no job posting is found with the id in the route', async () => {
      const request = { params: { id: '' } }

      stubbedDestroy.returns(0)

      await deleteJobPosting(request, response)

      expect(stubbedDestroy).to.have.been.calledWith({ where: { id: '' } })
      expect(stubbedStatus).to.have.been.calledWith(404)
      expect(stubbedStatusDotSend).to.have.been.calledWith('No job posting found with a id of ""')
    })

    it('returns a 500 status when an error occurs deleting the job posting', async () => {
      const request = { params: { id: '1' } }

      stubbedDestroy.throws('ERROR!')

      await deleteJobPosting(request, response)

      expect(stubbedDestroy).to.have.been.calledWith({ where: { id: '1' } })
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unable to delete job posting, please try again')
    })
  })
})
