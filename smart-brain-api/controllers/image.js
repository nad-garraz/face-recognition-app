const { ClarifaiStub, grpc } = require('clarifai-nodejs-grpc');

const stub = ClarifaiStub.grpc();
const metadata = new grpc.Metadata();
const CLARIFAI_TOKEN = process.env.CLARIFAI_TOKEN
metadata.set('authorization', `Key ${CLARIFAI_TOKEN}`);

const handleApiCall = async (req, res) => {
  const IMAGE_URL = await req.body.input; // recibo del front que manda a /image
  stub.PostModelOutputs(
    {
      model_id: 'face-detection',
      inputs: [{ data: { image: { url: IMAGE_URL } } }],
    },
    metadata,
    (err, response) => {
      if (err) {
        console.log('Error: ' + err);
        return;
      }

      if (response.status.code !== 10000) {
        console.log(
          'Received failed status: ' +
            response.status.description +
            '\n' +
            response.status.details,
        );
        return;
      }
      res.json(response);
    },
  );
};

const handleImagePut = (req, res, db) => {
  const { id } = req.body;
  db('users')
    .where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then((entries) => {
      res.json(entries[0]);
    })
    .catch((err) => res.status(400).json('Unable to get entries'));
};

module.exports = {
  handleImagePut: handleImagePut,
  handleApiCall: handleApiCall,
};
