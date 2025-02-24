import dotenv from "dotenv";
import { webpackBundler } from "@payloadcms/bundler-webpack";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { slateEditor } from "@payloadcms/richtext-slate";
import path from "path";
import { buildConfig } from "payload/config";
import { Users } from "./collections/Users";

dotenv.config({
	path: path.resolve(__dirname, "../.env")
});

export default buildConfig({
	serverURL: process.env.NEXT_PUBLIC_SERVER_URL || "",
	collections: [Users],
	routes: {
		admin: "/server"
	},
	admin: {
		user: "users",
		bundler: webpackBundler(),
		meta: {
			titleSuffix: "- DigitalCaterpillar",
			favicon: "/favicon.ico",
			ogImage: "/thumbnail.jpg"
		}
	},
	editor: slateEditor({}),
	db: mongooseAdapter({
		url: process.env.MONGODB_URL!
	}),
	typescript: {
		outputFile: path.resolve(__dirname, "payload-types.ts")
	}
});
