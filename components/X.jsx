import React, { useState, useEffect } from 'react'
import Search from './Search'
import Novel from './Novel'
import { filterNovels, retrieveNovels } from '../utils/novels'

export default () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [novelList, setNovelList] = useState([])
  const [filteredNovelList, setFilteredNovelList] = useState([])

  const noResultsMessage =
    'No novels found using that search. Perhaps your tastes just aren\'t popular enough? Honestly, the problem is with you, not this database. I\'m sorry, I\'m getting a little defensive. Maybe it is because I\'m feeling a little neglected lately, with fewer and fewer people reading classic titles? I don\'t know.'

  useEffect(() => {
    async function pullData() {
      const novels = await retrieveNovels()

      setNovelList(novels)
      setFilteredNovelList(novels)
    }
    pullData()
  }, [])

  useEffect(() => {
    const filtered = filterNovels(novelList, searchTerm)

    setFilteredNovelList(filtered)
  }, [searchTerm])

  return (
    <div className="page">
      <div className="title">Great Novels</div>
      <Search term={searchTerm} setter={setSearchTerm} />
      <div className="output">{ filteredNovelList.length ? '' : noResultsMessage }</div>
      <div className="list-divider">*</div>
      {
        filteredNovelList.map(novel => (
          <Novel
            key={novel.id}
            id={novel.id}
            title={novel.title}
            author={`${novel.author.nameFirst} ${novel.author.nameLast}`}
          />
        ))
      }
      <div className="list-divider">*</div>
    </div>
  )
}
