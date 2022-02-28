import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import './home.css'

function Home() {
    const [Amt, setAmt] = useState("");
    var data;
    var currkey;
    // const [curr, setCurr]=useState(initialState:'USD');
    const amtHandler = (e) => {
        setAmt(String(e.target.value));
        // console.log(Amt) 
    };
    // var currkey;
    const getCurrList = () => {
        axios
            .get(
                `http://api.currencylayer.com/list?access_key=6c1bae4bdf29f70ef95ed3288daffded`
            )
            .then((res) => {

                data = res.data.currencies;
                currkey = Object.keys(data);
                console.log(currkey)


            })
            .catch((err) => {
                alert(err);
                //   setAlertCode("4");
            });
    };


    useEffect(() => {
        getCurrList();
    }, []);

    // const listItems = data.map((d) => <li key={d.name}>{d.name}</li>;


    return (
        <div className="home">
            <form>

                <div class="mb-3">
                    <label for="disabledTextInput" class="form-label">Amount</label>
                    <input type="text" id="disabledTextInput" class="form-control" placeholder="Disabled input" onChange={(e) => amtHandler(e)}></input>
                </div>
                <div class="mb-3">
                    <label for="disabledSelect" class="form-label">Disabled select menu</label>
                    {/* <select id="disabledSelect" class="form-select">

                            
                        </select> */}
                    

                </div>

                <button type="submit" class="btn btn-primary">Submit</button>

            </form>
        </div>
    )
}

export default Home