# MJML For Meteor

MJML is a markup language designed to reduce the pain of coding a responsive email.   [Visit MJML more information ](https://mjml.io)

MJML For Meteor allows you to use MJML inside Meteor and includes
enhanced functionality like Handlebars for conditional statements and file includes.

To include for an example a `header.mjml` file in your email template use:  `{{> header }}`  and it will load that MJML file as long as the file is in the same directory.

Includes all Handlebars functionality.

`API`
>	`new MJML(filepath)`

>	Returns a new MJML Email instance

> `.helpers(helpers)`

> Pass all your Handlebars helpers into this function

> `.compile()`

> Returns a compiled version of your email

> `.send()`

> Calls Meteor's `Email.send` function, more documentation [here](https://docs.meteor.com/api/email.html)

### Examples:

Make sure you have the `MAIL_URL` environment variable set in Meteor, see [here](https://docs.meteor.com/api/email.html).

#### Basic MJML Email With Templating:
#### `server.js`
```javascript
var email = new MJML('../path-to-your/file.mjml');
email.helpers({
  message:"Hello World"
});

email.send({
  to: "to@email",
  from: "from@email",
  subject: "Just Testing..."
});
```

#### `file.mjml`
```xml
<mjml>
    <mj-body>
	    <mj-container>
	        <mj-text>{{message}}</mj-text>
        </mj-container>
    </mj-body>
</mjml>
```
This will Compile And Send A MJML Email.

#### MJML file with reuseable includes:
Example directory structure could look like this:
```
├── mjml
│   ├── header.mjml
│   └── body.mjml
│    server.js
```

#### `server.js`
```javascript
	var email = new MJML('./mjml/body.mjml');
    email.helpers({
        message: "hello world"
    });
    email.send({
        to: "to@email",
        from: "from@email",
        subject: "Hello World"
    });
```

#### `body.mjml`
```xml
	<mjml>
		<mj-body>
			<mj-container>
				{{> header }}
				<mj-section>
					<mj-text>this is the other content</mj-text>
				</mj-section>
			</mj-container>
		</mj-body>
	</mjml>
```

#### `header.mjml`
```xml
<mj-section>
	<mj-image width="300" src="http://www.online-image-editor.com//styles/2014/images/example_image.png">
</mj-section>

```
This will send an email with a image in the header.