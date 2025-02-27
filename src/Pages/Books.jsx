import { useNavigate } from 'react-router-dom';
import '../styles/styles.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../Components/Navbar';


function Books() {
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3001/books')
            .then((response) => {
                setBooks(response.data);
            })
            .catch((error) => {
                console.error('Error fetching books:', error);
            });
    }, []);

    const handleBookClick = (book) => {
        console.log('Book clicked:', book);
        navigate('/singlepage', { state: { book } });
    };

    return (
      <div>
        <NavBar/>
        <div style={{ fontFamily: 'Roboto, sans-serif', padding: '2rem', backgroundColor: 'black', minHeight: '100vh' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h1 style={{ color: 'red', fontFamily: 'monospace', fontSize: '2.5rem' }}>Available Books</h1>
            </div>

            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '2rem',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                {books.map((book) => ( 
                    book.rentalStatus && (
                    <button
                        className='card-button'
                        style={{
                            width: '250px',
                            height: '380px',
                            backgroundColor: 'black',
                            borderRadius: '15px',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            padding: '1rem',
                            textAlign: 'center',
                            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                        }}
                        onClick={() => handleBookClick(book)}
                        key={book.id}
                    >
                        <div>
                            <img
                                src={book.url} alt = "Error"
                                style={{
                                    width: '100%',
                                    height: '290px',
                                    objectFit: 'cover',
                                    borderRadius: '10px',
                                
                                }}
                            />
                        </div>
                        <div style={{ marginTop: '1rem' }}>
                        <h2 style={{ fontSize: '1.2rem', color: 'white', marginBottom: '0.5rem',fontFamily:'monospace' }}>{book.title}</h2>
                        </div>
                    </button>
                    )
                ))}
            </div>
        </div>
      </div>
    );
}

export default Books;