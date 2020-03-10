const config = require('../config/config')

const newAccount = (email, user) => {
  const text = `
    <div style="
      background-color:#FFC400;
      margin: 0;
      min-width:600px;
      width:100%;
      font-family: Roboto, 'Trebuchet MS', Arial, sans-serif;">
      <h2 style="
        text-align:center;
        color:#3f3940"
        padding: 16px;>Hi ${user.firstName} ${user.lastName}</h2>
      <h1 style="
        text-align:center;
        color:#3f3940
        padding: 16px;">IT'S TIME TO SEE IF YOU ARE REAL PERSON!</h1>
      <p style="
        text-align:center;
        color:#3f3940;
        padding: 16px;">
        You 've received this message because your email address ${email} has been used to
        create an account in Manitass. Verify yourself by clicking below<br>
      </p>
      <div style="
        width: 100%;
        display: flex;
        justify-content: center;
        padding: 16px;">
        <a style="display: block;
            padding: 16px;
            font-family: Roboto, Tahoma, sans-serif;
            border-radius: 4px;
            text-decoration: none;
            display:inline-block;
            background-color: rgb(34, 29, 35);
            color: rgb(255, 196, 0);
            padding: 16px;"
          href="${config.base_url}/confirmation/${user.id}">
          CLICK TO VERIFY
        </a>
      </div>
      <p style="
        font-size:14px;
        line-height:21px;
        text-align:center;
        padding: 16px;">
        <span style="
          color:#3f3940;
          padding: 16px;
          display:inline-block;">
          If it wasn't you who create this account with this email. Simply ignore this email
          and don't click above.
        </span>
      </p>
    </div>`

  return {
    to: email,
    from: {
      address: config.mail,
      name: 'Manitass'
    },
    subject: `Hi ${user.firstName} from Manitass`,
    text
  }
}

module.exports = newAccount
