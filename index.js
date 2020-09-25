const e = require("express");
var http = require("http");
//TODO - Use Employee Module here
var employeesList = require("./Employee");

console.log("Lab 03 -  NodeJs");

//TODO - Fix any errors you found working with lab exercise

//Define Server Port
const port = process.env.PORT || 8081

//Create Web Server using CORE API
const server = http.createServer((req, res) => {
    if (req.method !== 'GET') {
        res.end(`{"error": "${http.STATUS_CODES[405]}"}`)
    } else {
        if (req.url === '/') {
            //TODO - Display message "<h1>Welcome to Lab Exercise 03</h1>"
            res.write("<h1>Welcome to Lab Exercise 03</h1>");
            res.end()
        }

        if (req.url === '/employee') {
            //TODO - Display all details for employees in JSON format
            res.setHeader('Content-Type', 'application/json;charset=utf-8');
            return res.end(JSON.stringify(employeesList.employees));
        }

        if (req.url === '/employee/names') {
            //TODO - Display only all employees {first name + lastname} in Ascending order in JSON Array
            //e.g. [ "Ash Lee", "Mac Mohan", "Pritesh Patel"]
            let tempArray = [];
            employeesList.employees.map(x => tempArray.unshift(x["firstName"] + " " + x["lastName"]))
            tempArray = tempArray.sort();
            res.setHeader('Content-Type', 'application/json;charset=utf-8');
            return res.end(JSON.stringify(tempArray));


            // test = employees.map(x => x.firstName)
            // res.setHeader('Content-Type', 'application/json;charset=utf-8');
            // return res.end(JSON.parse(test));
        }

        if (req.url === '/employee/totalsalary') {
            //TODO - Display Sum of all employees salary in given JSON format 
            //e.g. { "total_salary" : 100 }
            let salaryArray = [];
            employeesList.employees.map(x => salaryArray.unshift(x["Salary"]));
            let totalSalary = salaryArray.reduce((acc, val) => { return acc + val}, 0);1
            return res.end(JSON.stringify(totalSalary));
        }  
    }
    res.end(`{"error": "${http.STATUS_CODES[404]}"}`)
})

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})