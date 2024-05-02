import MainPage from './components/MainPage.tsx';
import ImageSplitter from './scripts/ImageSplitter.ts';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import square from '/src/assets/square.avif';
import './App.css';
import { useState, useEffect } from 'react';
import Button from './components/Button.tsx';
interface PixabayImage {
  id: number;
  webformatURL: string;
  tags: string;
}

function App() {
  const [images, setImages] = useState<string[]>([]);
  const [started, setStarted] = useState(false);
  const [dimension, setDimension] = useState(3);

  const [imageData, setImageData] = useState<PixabayImage | null>(null);
  const [imageBase64, setImageBase64] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const API_KEY = '42810216-6cc735c1d5bfb64c08d687dd2'; // Replace with your actual Pixabay API key
  const query = 'square+colors'; // You can change the search query as needed

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const page = Math.floor(Math.random() * 10) + 1; // Generate a random page number
        const response = await fetch(
          `https://pixabay.com/api/?key=${API_KEY}&q=${query}&image_type=photo&per_page=3&page=${page}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch image');
        }

        const data = await response.json();

        if (data.hits.length > 0) {
          const image = data.hits[0] as PixabayImage;
          setImageData(image);

          // Convert image to base64
          const imageBlob = await fetch(image.webformatURL).then((res) =>
            res.blob()
          );
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64data = reader.result as string;
            setImageBase64(base64data);
          };
          reader.readAsDataURL(imageBlob);
        } else {
          throw new Error('No images found');
        }
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchImage();
  }, [API_KEY, query]);

  useEffect(() => {
    async function fetchData() {
      const images = await ImageSplitter(
        imageBase64 == '' ? square : imageBase64,
        dimension
      );
      setImages(images);
    }

    fetchData();
  }, [started, imageBase64, dimension]);

  return (
    <Router basename="/slide">
      <div>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <h1 className="heading-text">Slide!</h1>
                <h2 style={{ width: '80%', display: 'inline' }}>
                  Number of rows/columns:{' '}
                </h2>
                <select
                  defaultValue={3}
                  onChange={(e) => {
                    setDimension(parseInt(e.target.value));
                  }}
                  style={{
                    margin: '10px',
                    justifySelf: 'center',
                    display: 'inline',
                  }}
                >
                  <option value={3}>3</option> <option value={4}>4</option>
                  <option value={5}>5</option>
                  <option value={6}>6</option>
                </select>
                <Link to="/play">
                  <Button
                    selected="action-btn center"
                    clickHandler={() => setStarted(true)}
                  >
                    Start Slide!
                  </Button>
                </Link>
              </>
            }
          />
          <Route
            path="/play"
            element={
              images.length === 0 ? (
                <h1>Loading...</h1>
              ) : (
                <MainPage
                  empty={dimension * dimension - 1}
                  dimension={dimension}
                  images={images}
                />
              )
            }
          ></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
