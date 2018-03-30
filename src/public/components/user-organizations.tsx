import React, {Component} from 'react';

function UserOrgs(props) {
    console.log(props)
    let printableOrgs = JSON.stringify(props.Orgs)
    return (
        <div>
            <h1>user orgs</h1>
            {printableOrgs}
        </div>
    )
}

export default UserOrgs;