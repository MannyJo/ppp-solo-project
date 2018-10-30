CREATE TABLE "gmail_credentials" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(200) NOT NULL,
	"content" TEXT NOT NULL
);



insert into "gmail_credentials" ( "name", "content" )
values ('client_id', '1058614535992-0kvfhgvntmjmt2ie59ja22mf17qiatqb.apps.googleusercontent.com'),
		('project_id', 'my-project-1539982567619'),
		('auth_uri', 'https://accounts.google.com/o/oauth2/auth'),
		('token_uri', 'https://www.googleapis.com/oauth2/v3/token'),
		('auth_provider_x509_cert_url', 'https://www.googleapis.com/oauth2/v1/certs'),
		('client_secret', 'UyUd4gC6E4wWt1cQx_yuZIpH'),
		('redirect_uris', 'urn:ietf:wg:oauth:2.0:oob, http://localhost');