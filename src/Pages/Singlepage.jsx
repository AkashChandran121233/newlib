import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../Components/Navbar';
import { AiFillLike } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
function SinglePage() {
  const location = useLocation();
  const { book } = location.state || {};
  const navigate = useNavigate();

  const goBack = () => {
    console.log('Back clicked'); // Log book details
    navigate('/books');
  };

  //============================================

  const [userDetails, setUserDetails] = useState();

  useEffect(() => {
    const storedUserDetails = JSON.parse(localStorage.getItem("userDetails"));
    if (storedUserDetails) {
      console.log("Stored User Details:", storedUserDetails);
      setUserDetails(storedUserDetails);
    }
  }, []);

  const [Like, setLike] = useState()
  const [comment, setComment] = useState("")

  const [inputComment, setInputComment] = useState("")
  useEffect(() => {
    axios.get('http://localhost:3001/Like', { params: { title: book.title } })
      .then((response) => {
        setLike(response.data);
      })
      .catch((error) => {
        console.error('Error fetching comments:', error);
      });

  }, [book.title]);

  useEffect(() => {
    axios.get('http://localhost:3001/comment', { params: { title: book.title } })
      .then((response) => {
        setComment(response.data);
      })
      .catch((error) => {
        console.error('Error fetching books:', error);
      });

  }, [book.title]);

  const handleRentBook = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/singlepage', { name: userDetails.name, title: book.title, email: userDetails.email, status: "Pending", ExpiryTime: null, Expire: false })
      .then(result => {
        console.log(result)

      })
      .catch(err => {
        if (err.response && err.response.status === 400) {
          console.log("Something Went Wrong in handleRentBook");
        }
        else {
          console.log("An error occurred. Please try again in handleRentBook");
        }
        console.error(err)
      })
    navigate('/bookrequest');


  };


  const handleLike = (e) => {

    e.preventDefault();
    axios.put('http://localhost:3001/like', { title: book.title })
      .then(result => {
        console.log(result)
      })
      .catch(err => {
        if (err.response && err.response.status === 400) {
          console.log("Something Went Wrong in handleLike.");
        }
        else {
          console.log("An error occurred. Please try again in handleLike");
        }
        console.error(err)

      })
    window.location.reload();

  };

  const handleComment = (e) => {

    e.preventDefault();
    axios.put('http://localhost:3001/comment', { title: book.title, inputComment: inputComment })
      .then(result => {
        console.log(result)
      })
      .catch(err => {
        if (err.response && err.response.status === 400) {
          console.log("Something Went Wrong in handleComment.");
        }
        else {
          console.log("An error occurred. Please try again in handleComment.");
        }
        console.error(err)

      })
    window.location.reload();

  };

  //============================================

  if (!book) {
    return (
      <div
        style={{
          height: '100vh',
          backgroundColor: 'black',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <p>No book selected. Please go back and select a book.</p>
      </div>
    );
  }

  return (
    <div>
      <NavBar />
      <div
        style={{
          height: '100vh',
          backgroundColor: 'black',
          color: 'white',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: '40px',
            alignItems: 'center',
            flexDirection: 'row',
            textAlign: 'left',
          }}
        >
          {/* Book Cover */}
          <div>
            <img
              src={book.url || 'https://via.placeholder.com/300x400?text=No+Cover+Available'} // Use the book's imageUrl from the database
              alt={book.title}
              style={{
                width: '300px',
                height: '400px',
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(255, 255, 255, 0.2)',
                objectFit: 'cover',
              }}
            />
          </div>

          {/* Book Details */}
          <div>
            <h1
              style={{
                fontSize: '50px',
                marginBottom: '20px',
                color: 'red',
                textTransform: 'uppercase',
                letterSpacing: '2px',
              }}
            >
              Book Details
            </h1>
            <h2
              style={{
                fontSize: '30px',
                marginBottom: '10px',
                textTransform: 'capitalize',
              }}
            >
              Title: <span style={{ color: 'white', fontFamily: 'monospace' }}>{book.title}</span>
            </h2>
            <p style={{ fontSize: '20px', marginBottom: '10px', fontFamily: 'monospace' }}>
              BookId: <span style={{ color: 'white' }}>{book.id}</span>
            </p>
            <p style={{ fontSize: '20px', marginBottom: '10px', fontFamily: 'monospace' }}>
              Author: <span style={{ color: 'white' }}>{book.author}</span>
            </p>
            <p style={{ fontSize: '20px', marginBottom: '10px', fontFamily: 'monospace' }}>
              Genre: <span style={{ color: 'white' }}>{book.genre}</span>
            </p>
            <p style={{ fontSize: '20px', marginBottom: '10px', fontFamily: 'monospace' }}>
              Publication Year: <span style={{ color: 'white' }}>{book.publicationYear}</span>
            </p>
            <p style={{ fontSize: '20px', marginBottom: '20px', fontFamily: 'monospace' }}>
              ISBN: <span style={{ color: 'white' }}>{book.isbn}</span>
            </p>

            <button
              onClick={handleRentBook}
              style={{
                backgroundColor: 'red',
                color: 'black',
                fontSize: '18px',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                textTransform: 'uppercase',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = 'white') || (e.target.style.color = 'red')}
              onMouseLeave={(e) => (e.target.style.backgroundColor = 'red') || (e.target.style.color = 'white')}
            >
              RentBook
            </button>
            <button
              onClick={goBack}
              style={{
                backgroundColor: 'red',
                color: 'black',
                fontSize: '18px',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                textTransform: 'uppercase',
                transition: 'all 0.3s ease',
                marginLeft: '10px'
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = 'white') || (e.target.style.color = 'red')}
              onMouseLeave={(e) => (e.target.style.backgroundColor = 'red') || (e.target.style.color = 'white')}
            >
              Back
            </button>
            <br /><br />
            <button onClick={handleLike} style={{ textDecoration: 'none', border: 'none', background: 'none', color: 'white' }}><AiFillLike style={{ color: 'white', fontSize: '35px' }} />{Like > 0 ? Like : ""} </button>

          </div>
        </div>
      </div>

      <h2>Comments</h2>
      <div>

        <p><FaUserCircle />  <input name='bookcomment' placeholder='Add a comment' onChange={(e) => setInputComment(e.target.value)} />  <button onClick={handleComment}>Post</button> </p>

        <div>
          {comment.split(',').map((c, index) => (
            <p key={index}>
              {c === "" ? "" : (
                <>
                  <FaUserCircle /> Anonymous User 
                </>
              )} <br /> {c.trim()}
            </p>
          ))}
        </div>

      </div>

    </div>

  );
}

export default SinglePage;
