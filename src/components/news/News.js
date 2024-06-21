import React, { useEffect, useState } from 'react';
import './News.css';

const News = () => {
  const [mynews, setMyNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchData = async () => {
    let response = await fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=9d512d0bb47f472ead951a0a2a300e0e');
    let data = await response.json();
    setMyNews(data.articles);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const totalPages = Math.ceil(mynews.length / itemsPerPage);

  const currentItems = mynews.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className='mainDiv'>
        {currentItems.map((ele, index) => (
          <div key={index} className='card' style={{ width: '320px', height: '350px', marginLeft: '4rem', marginTop: '2rem' }}>
            <img
              src={ele.urlToImage == null ? 'https://deadline.com/wp-content/uploads/2024/06/olivia-cooke-fabien-frankel-house-of-the-dragon-hbo.jpg?w=1024' : ele.urlToImage}
              className='card-img-top'
              alt='...'
            />
            <div className='card-body'>
              <h5 className='card-title'>{ele.author == '' ? 'Chris Eberhart' : ele.author}</h5>
              <p className='card-text'>{ele.title}</p>
              <a href={ele.url} target='_blank' rel='noopener noreferrer' className='btn btn-primary'>
                Read More
              </a>
            </div>
          </div>
        ))}
      </div>
      <div className='pagination'>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </>
  );
};

export default News;