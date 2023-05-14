import { useEffect, useState } from "react"
import api from "../../api/api";
import tokens from '../../api/tokens';

const flex = {
    display: "flex",
    flexDirection: "column",
    gap: "10px"
};

export default function Gallery() {
    const [gallery, setGallery] = useState([]);
    useEffect(() => {
        api.post('/gallery/getall').then(data => {
            setGallery(data.data);
        });
    }, [ setGallery ]);
    
    function submitForm(e) {
        e.preventDefault();
        console.log('pre submit')
        const files = document.getElementById("gallery-files-input");
        const formData = new FormData();
        formData.append("files", files.files[0]);
        fetch(api.getUri()+"/gallery/upload", {
            method: 'POST',
            headers: { 'Authorization': tokens.getToken() },
            body: formData,
        }).then((res) => {
            res.json().then(j => {
                setTimeout(() => {
                    console.log('adding file', j.filename);
                    setGallery([...gallery, j.filename]);
                }, 1000);
            })
        })
        .catch((err) => console.log("Error occured", err));
    }

    return (
        <div className="gallery">
            <h1>Gallery</h1>
            <div className="gallery-form" style={flex}>
                <img src="" className="uploaded-image" alt="no" />
                <input id='gallery-files-input' type="file" onChange={submitForm} />
            </div>
            <div className="gallery-list" style={{...flex, marginTop: "20px"}}>
                {gallery.sort((a1,a2) => a2.localeCompare(a1, undefined, {numeric: true})).map((image) => (
                    <img src={api.getUri()+'/gallery/'+image} 
                    alt={'image from gallery: '+ image}
                    width={500}  key={image}/>
                ))}
            </div>
        </div>
    )
}