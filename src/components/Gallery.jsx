import getPhotoUrl from 'get-photo-url'
import { useState } from 'react'
// import MyPics1 from '../assets/MyPics1.jpeg'
// import MyPics2 from '../assets/MyPics2.jpeg'
// import image12 from '../assets/image12.png'
// import image1 from '../assets/image1.jpg'


const Gallery = () => {
    const [allPhotos, setAllPhotos] = useState([])

    const addPhoto = async () => {
        const newPhoto = {
            id: Date.now(),
            url: await getPhotoUrl('#addPhotoInput'),
        }

        setAllPhotos([newPhoto, ...allPhotos])
    }

    return (
        <>
        <input type="file" name="photo" id="addPhotoInput" />
        <label htmlFor="addPhotoInput" onClick={addPhoto}>
            <i className="add-photo-button fas fa-plus-square"></i>
        </label>

        <section className='gallery'>
            {allPhotos.map( (photo) => (
                <div className="item" key={photo.id}>
                    <img src={photo.url} className="item-image" alt="" />
                    <button className='delete-button'>Delete</button>
                </div>
            ))}
            
            {/* <div className="item">
                <img src={MyPics2} className="item-image" alt="" />
                <button className='delete-button'>Delete</button>
            </div>
            <div className="item">
                <img src={image12} className="item-image" alt="" />
                <button className='delete-button'>Delete</button>
            </div>
            <div className="item">
                <img src={image1} className="item-image" alt="" />
                <button className='delete-button'>Delete</button>
            </div> */}
        </section>
        </>
        
    )
}

export default Gallery