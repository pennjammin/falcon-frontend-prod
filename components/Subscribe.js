import React from 'react';
import Head from 'next/head';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Layout from "../components/Layout.js";
import fetch from "isomorphic-unfetch";
import NProgress from 'nprogress';
import { subscribeToNewsletter } from '../lib/api/public';


class Subscribe extends React.Component {
  onSubmit = async (e) => {
    e.preventDefault();

    const email = (this.emailInput && this.emailInput.value) || null;

    if (this.emailInput && !email) {
          return;
        }

    NProgress.start();

    try {
      await subscribeToNewsletter({ email });

    if (this.emailInput) {
        this.emailInput.value = '';
      }
      
      NProgress.done();
      console.log('email was successfully added to Mailchimp list');
    } catch (err) {
      console.log(err); //eslint-disable-line
      NProgress.done();
  }
};

render() {
    return (

      <div style={{ padding: '10px 45px' }}>
        <br />
        <form onSubmit={this.onSubmit}>
          <p>Get the latest scoop on all things tech:</p>
          <TextField
            inputRef={(elm) => {
              this.emailInput = elm;
            }}
            type="email"
            label="Your email"
            className="white"
            required
          />
          <p />
          <Button variant="raised" color="primary" type="submit">
            Subscribe
          </Button>
        </form>
      </div>

    );
  }
}

export default Subscribe;