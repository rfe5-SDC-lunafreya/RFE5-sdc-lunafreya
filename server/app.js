import {app, port} from './index.js'

app.listen(port, function(err) {
  if (err) console.log("erro in serving setup")
  console.log(`Moving and groving on port ${port}`);
});