import React, {Component} from 'react';

function UserProfile(props) {
    console.log(props)
    let printableProfile = JSON.stringify(props.profile)
    return (
        <div>
            <h1>user profile</h1>
            {printableProfile}
        </div>
    )
}

export default UserProfile;