import Honeybadger from "honeybadger-js";
import {HONEYBADGER_KEY} from "../constants";

const honeybadger = Honeybadger.configure({
	api_key: HONEYBADGER_KEY,
	environment: process.env.NODE_ENV || "development"
});

export default honeybadger;
