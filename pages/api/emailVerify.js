import axios from "axios";
export default async function handler(req, res) {


    // console.log(req.body.email)
    const options = {
              method: 'POST',
              url: 'https://api.apyhub.com/validate/email/academic',
              headers: {
                'apy-token': 'APY00unTPLCvl40R3QGYXgR9Wll2lELRlMhUsAtfJsUveaPKW3n0Y1dZBCWjIMbKDixWLrd49firCn',
                'Content-Type': 'application/json'
              },
              
              data:{email:req.body.email}
            };
        const response = await axios.request(options) ;
    //     const data = response.data;
        

    
    res.status(200).json({status:response.data.data})
  }