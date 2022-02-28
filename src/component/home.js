import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { DataGrid } from '@mui/x-data-grid';
import "./home.css";

function Home() {
    const [amount, setAmount] = useState("")
    const [Amt, setAmt] = useState("");
    const [Val, setVal] = useState("")
    const [conv, setConv] = useState("")
    const [tablerow, settablerow] = useState([]);

    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'finalamount', headerName: 'Amount', width: 150 },

    ];

    useEffect(() => {
        getCurrList();
    }, []);
    var data;
    var currkey;

    const amtHandler = (e) => {
        setAmount(String(e.target.value));

    };



    const getCurrList = () => {
        axios
            .get(
                `http://api.currencylayer.com/list?access_key=6c1bae4bdf29f70ef95ed3288daffded`
            )
            .then((res) => {
                data = res.data.currencies;
                setVal(res.data.currencies);
                currkey = Object.keys(data);
                setAmt(currkey);

            })
            .catch((err) => {
                alert(err);
            });
        axios
            .get(
                `http://api.currencylayer.com/live?access_key=6c1bae4bdf29f70ef95ed3288daffded`
            )
            .then((res) => {
                var data = res.data.quotes;
                setConv(data);

            })
            .catch((err) => {
                alert(err);
            });


    };
    var items;

    const handleClick = (value) => {
        setVal(String(value));

        var arr = Object.keys(conv)
        var x;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].includes(value)) {
                x = i;
                break;
            }
        }
        var currtodata = arr.at(x);
        var indollar = amount / conv[currtodata];
        var convertedArray = [];
        for (let i = 0; i < arr.length; i++) {
            var currtodata2 = arr.at(i);
            var z = conv[currtodata2];
            convertedArray[i] = z * indollar;
        }

        items = Amt.map((id, index) => {
            return {
                id: id,
                name: String(Val[id]),
                finalamount: convertedArray[index]
            }
        });
        settablerow(items);
    };



    return (
        <div className="home">
            <form>
                <div class="mb-3">

                    <label class="form-label">
                        Amount
                    </label>
                    <input
                        type="text"
                        id="disabledTextInput"
                        class="form-control"
                        placeholder="Amount"
                        onChange={(e) => amtHandler(e)}
                    ></input>
                </div>
                <div class="mb-3">

                    <Autocomplete
                        disablePortal
                        onChange={(event, value) => handleClick(value)}
                        id="combo-box-demo"

                        options={Amt}

                        sx={{ width: 300 }}
                        renderInput={(params) => (
                            <TextField {...params} label="Currency" />
                        )}
                    />

                </div>


            </form>{tablerow.length > 0 && <div style={{ height: 400, width: '25vw' }}>
                <DataGrid
                    rows={tablerow}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}

                />
            </div>}

        </div>
    );
}


export default Home;