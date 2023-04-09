import axios from "axios";
export default async function handler(req, res) {

  const options = {
              method: 'POST',
              url: 'https://api.apyhub.com/validate/email/academic',
              headers: {
                'apy-token': 'APY00unTPLCvl40R3QGYXgR9Wll2lELRlMhUsAtfJsUveaPKW3n0Y1dZBCWjIMbKDixWLrd49firCn',
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*"
              },
              
              data:{email:req.body.email}
            };
        const response = await axios.request(options) ;
    //     const data = response.data;
        

    
    res.status(200).json({status:response.data.data})
  }