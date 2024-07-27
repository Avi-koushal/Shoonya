import React, { useState, useEffect } from 'react';

function Home() {
    const [retreats, setRetreats] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterDate, setFilterDate] = useState('');
    const [filterType, setFilterType] = useState('');
    const itemsPerPage = 3;

    useEffect(() => {
        fetchRetreats();
    }, [currentPage, searchQuery, filterDate, filterType]);

    async function fetchRetreats() {
        try {
            const query = new URLSearchParams({
                page: currentPage,
                limit: itemsPerPage,
                ...(searchQuery && { search: searchQuery }),
                ...(filterDate && { filter: filterDate }),
                ...(filterType && { type: filterType })
            });
            const response = await fetch(`https://669f704cb132e2c136fdd9a0.mockapi.io/api/v1/retreats?${query.toString()}`);
            const data = await response.json();
            console.log('Fetched data:', data);
            setRetreats(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error fetching the retreats:', error);
            setRetreats([]); // Ensure retreats is an array in case of error
        }
    }

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handlePreviousPage = () => {
        setCurrentPage(currentPage - 1);
    };

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
        setCurrentPage(1);
    };

    const handleFilterDate = (event) => {
        setFilterDate(event.target.value);
        setCurrentPage(1);
    };

    const handleFilterType = (event) => {
        setFilterType(event.target.value);
        setCurrentPage(1);
    };

    const convertUnixToDate = (unixTimestamp) => {
        const date = new Date(unixTimestamp * 1000);
        return date.toISOString().split('T')[0]; // Returns date in 'YYYY-MM-DD' format
    };

    const uniqueDates = [...new Set(retreats.map(retreat => convertUnixToDate(retreat.date)))];

    return (
        <>
            <div className="col-12 px-4">
                <div className="Banner">
                    <div className='bannerbox'>
                        <img src="/imgs/photoi.JFIF" alt="Image 1" />
                    </div>
                    <p><strong>Discover Your Inner Peace</strong></p>
                    <p>Join us for a series of wellness retreats designed to help you find tranquility and rejuvenation.</p>
                </div>
                <div className='fordesk'>
                    <select onChange={handleFilterDate} value={filterDate} style={{width:"100%",marginTop:"10px"}}>
                        <option value="">Filter By Date</option>
                        {uniqueDates.map((date, index) => (
                            <option key={index} value={date}>{date}</option>
                        ))}
                    </select>
                    <select onChange={handleFilterType} value={filterType} style={{width:"100%",marginTop:"10px"}}>
                        <option value="">Filter By Type</option>
                        <option value="Signature">Signature</option>
                        <option value="Standalone">Standalone</option>
                    </select>
                    <div className='filterss'>
                        <input
                            placeholder='Search retreats by title'
                            value={searchQuery}
                            onChange={handleSearch}
                            style={{width:"100%",marginTop:"10px"}}
                        />
                    </div>
                </div>
                <div className='row formob'>
                    <div className='col-sm-12 col-6'>
                        <div className='filter'>
                            <select onChange={handleFilterDate} value={filterDate}>
                                <option value="">Filter By Date</option>
                                {uniqueDates.map((date, index) => (
                                    <option key={index} value={date}>{date}</option>
                                ))}
                            </select>
                            <select onChange={handleFilterType} value={filterType}>
                                <option value="">Filter By Type</option>
                                <option value="Signature">Signature</option>
                                <option value="Standalone">Standalone</option>
                            </select>
                        </div>
                    </div>
                    <div className='col-sm-12 col-6'>
                        <div className='filters'>
                            <input
                                placeholder='Search retreats by title'
                                value={searchQuery}
                                onChange={handleSearch}
                            />
                        </div>
                    </div>
                </div>
                <div className='row'>
                    {retreats.map(retreat => (
                        <div key={retreat.id} className='col-sm-12 col-md-12  col-lg-4 p-3'>
                            <div className='container'>
                                <img src={retreat.image} alt="wellness img" />
                                <div>
                                    <p><strong>{retreat.title}</strong></p>
                                    <p>{retreat.description}</p>
                                    <p><strong>Date: </strong>{convertUnixToDate(retreat.date)}</p>
                                    <p><strong>Location: </strong>{retreat.location}</p>
                                    <p><strong>Price: </strong>{retreat.price}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='Pagination'>
                    <button onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</button>
                    <button onClick={handleNextPage} disabled={retreats.length < itemsPerPage}>Next</button>
                </div>
            </div>
        </>
    );
}

export default Home;
