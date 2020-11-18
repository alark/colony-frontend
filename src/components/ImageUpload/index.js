import React, { useState } from 'react';
import { storage } from 'components/FirebaseConfig';
import { useProfileProvider } from 'contexts/profile';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Add from '@material-ui/icons/Add';


const Uploader = (props) => {
  const [image, setImage] = useState(null);
  const [note, setNote] = useState(null);
  const [timestamp, setTimestamp] = useState(null);
  const [date, setDate] = useState(null);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const [addDialog, setAddDialogOpen] = React.useState(false);
  const { state, storeImageLink } = useProfileProvider();
  const { colonyId } = state;
  const { animalId } = props;

  const handleChange = (e) => {
    const file = e.target.files[0];

    console.log("file", file);
    const lastModDate = file.lastModifiedDate;
    var dateString = new Date("" + lastModDate.getUTCFullYear() + "/" + (lastModDate.getUTCMonth()+1) +
    "/" + lastModDate.getUTCDate() + " " + lastModDate.getUTCHours() + ":" + lastModDate.getUTCMinutes() +
    ":" + lastModDate.getUTCSeconds());

    console.log(dateString);

//     getUTCDate: ƒ getUTCDate()
// getUTCDay: ƒ getUTCDay()
// getUTCHours: ƒ getUTCHours()
// getUTCMilliseconds: ƒ getUTCMilliseconds()
// getUTCMinutes: ƒ
// getUTCMonth: ƒ getUTCMonth()
// getUTCSeconds: ƒ getUTCSeconds()

    // console.log("file.lastModifiedDate", file.lastModifiedDate);
    // console.log("file.lastModifiedDate.toDateString()", file.lastModifiedDate.toDateString());

    // const temp = new String(file.lastModifiedDate.toDateString());
    // var newdate = temp.slice(4);
    // console.log("newdate", newdate);
    console.log("typeog file.lastmodified:", typeof file.lastModified);
    setTimestamp(file.lastModified);
    setDate(dateString.toDateString());

    if (file) {
      const fileType = file.type;
      const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
      if (validImageTypes.includes(fileType)) {
        setError('');
        setImage(file);
      } else {
        setError('Please select an image to upload');
      }
    }
  };

  const openAddDialog = () => {
    setAddDialogOpen(true);
  };

  const closeAddDialog = () => {
    setAddDialogOpen(false);
  };

  const handleNoteChange = (e) => {
    const imageNote = e.target.value;
    console.log("value: ", e.target.value);
    setNote(imageNote);
    console.log("Set note as ", imageNote);
  }

  const handleUpdate = () => {
    closeAddDialog();
    console.log("note is: ", note);
    if (image) {

      console.log("date: ", date);
      console.log("timestamp: ", timestamp);

      var metadata = {
        customMetadata: {
          'Animal Id': `${animalId}`,
          'Colony Id': `${colonyId}`,
          'note': `${note}`,
          timestamp: `${timestamp}`,
          'date': `${date}`,
        }
      };

      // Upload the file with custom metadata to colony and animal specific folder
      const uploadTask = storage.ref(`images/${colonyId}/${animalId}/${date}/${image.name}`).put(image, metadata);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setProgress(progress);
        },
        (error) => {
          setError(error);
        },
        () => {
          storage
            .ref(`images/${colonyId}/${animalId}/${date}`)
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              console.log('url', url);
              storeImageLink({ colonyId, animalId, url, timestamp, date, note });
              console.log("called storeimage link");
              setProgress(0);
            });
        },
      );
    } else {
      setError('Error please choose an image to upload');
      setImage(null);
      setNote(null);
      setTimestamp(null);
      setDate(null);
    }
  };

  return (
    <div>
      <Button startIcon={<Add />} variant="outlined" onClick={openAddDialog}>
          Upload Image
      </Button>

      <Dialog open={addDialog} onClose={closeAddDialog} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Upload Image</DialogTitle>
        <DialogContent>
          <DialogContentText>
              Upload an image for this animal
          </DialogContentText>
          <div>
            <input type="file" name="file" onChange={handleChange} />
          </div>
          <div>
            <TextField variant="outlined" margin="dense" size="small" name="text" label="Add Image Note" onChange={handleNoteChange} />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdate} startIcon={<CloudUploadIcon />}>Upload</Button>
        </DialogActions>
      </Dialog>
      <div style={{ height: '20px' }}>
        {progress > 0 ? <progress value={progress} max="100" /> : ''}
        <p style={{ color: 'red' }}>{error}</p>
      </div>
    </div>
  );
};

export default Uploader;
