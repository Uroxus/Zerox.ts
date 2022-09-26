import Express from "express";
import { Registry } from 'prom-client';

const PrometheusRouter = Express.Router();

export const Register = new Registry();
export const AppName = ( process.env.npm_package_name as string || "Unnamed" ).replace( ".", "_" );

Register.setDefaultLabels( {
    app: AppName
} );

PrometheusRouter.get( "/metrics", async function ( req, res ) {
    res.setHeader( "Content-Type", Register.contentType );
    res.end( await Register.metrics() );
} );

export default PrometheusRouter;