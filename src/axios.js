import axios from 'axios'

const instance=axios.create({
    baseURL:"https://us-central1-clone-8f23a.cloudfunctions.net/api"
    
    //"http://localhost:5001/clone-8f23a/us-central1/api"
})

export default instance