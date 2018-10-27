# Gino Legaltech Javascript technical test

The goal of this test is to create a dynamic form from a JSON web 
service giving a list of variables with their associated type and
associated constraints.

The application already contains a backend (DISCLAIMER, that's my first 
application in Node.js). Code the frontend part using the Javascript framework 
of your choice. If you hesitate, Angular (JS or 2.0) would be appreciated.
Feel free to change the folder structure as needed.

## Web service request return

A call to GET http://localhost:9000/templates will return a JSON such as
the one below:

```javascript
{
    "template_id": 8996290,
    "template_name": "Generation test",
    "variables": [
        {
            "id": 1234,
            "name": "duedate",
            "label": "Due date",
            "type": "date",
            "min_value": 1496275200,
            "max_value": 1527811200
        },
        {
            "id": 1235,
            "name": "creationdate",
            "label": "Creation date",
            "type": "date"
        },
        {
            "id": 1236,
            "name": "amount",
            "label": "Amount",
            "type": "number",
            "min_value": 0
        },
        {
            "id": 1237,
            "name": "name",
            "label": "Name",
            "type": "text"
        }
    ]
}
```

### Template

A template contains the following fields:

* `template_id` (required): the id of the template that will have to be communicated
back to the server.
* `template_name`(required): the name of the template to display somewhere on 
the form
* `variables`: the list of form variables to generate the form from

### Variable

A variable contains the following fields:

* `id` (required): the variable id to be communicated back to the server
* `name` (required): the variable name
* `label` (required): the variable label to display on the form
* `type` (required): the type of the variable. It can be `text` for strings, 
`number` for float numbers or `date` for date values
* `min_value` (optional): the lower bound of a number or date variable. This bound
is expressed in numeric value for numbers and in Unix timestamps for dates.
* `max_value` (optional): the higher bound of a number or date variable. This bound
is expressed in numeric value for numbers and in Unix timestamps for dates.

## Web service POST request on submit

When the user submit the generated form to the web server 
on http://localhost:9000/answers, the application should then 
submit the form using the POST method following the following format:

```javascript
{
    "template_id": 8996290,
    "answers": [
        {
            "variable_id": 1234,
            "value": 1516275200
        },
        {
            "variable_id": 1235,
            "value": 1517518700
        },
        {
            "variable_id": 1236,
            "value": 500
        },
        {
            "variable_id": 1237,
            "value": "R. Daneel Olivaw"
        }
    ]
}
```

## Evaluation process

The code should take half a day to a day to write. You have one week.

* Fork this repository and give read access to us
* Do not hesitate to push often, we will check the code every evening
and make appropriate comments or ask questions.

We will pay particular attention to the following points:

* Code structure and algorithmic complexity
* Compliance with best practice
* Unit tests
* Documentation
* Reactions to reviews

At the end of the test, you will present it to the Gino Legaltech developer 
team during a live code review.

You can launch the server with `npm start`.

## Bonus tasks !

You do not have to do it but if you want to push it further, here are some 
additional tasks. You will not be penalized if you do not them but it might
help us to choose the best candidate among applicants :) Only start if you are
fully satisfied with the main exercise. In any case, think about how you would
perform them because this will incorporated into the code review discussion.
 
### Boolean variables
 
Make the application handle boolean variables.

### Multilingual (front)

Use the following input to allow the user to view labels in her/his language:

```javascript
{
    "template_id": 8996290,
    "template_name": "Generation test",
    "variables": [
        {
            "id": 1234,
            "name": "duedate",
            "label": {
                "en" : "Due date",
                "fr" : "Date limite",
                "ja": "締め切り"
            }
            "type": "date",
            "min_value": 1496275200,
            "max_value": 1527811200
        },
        {
            "id": 1235,
            "name": "creationdate",
            "label": {
                "en": "Creation date",
                "fr": "Date de création",
                "ja": "作成日"
            },
            "type": "date"
        },
        {
            "id": 1236,
            "name": {
                "en" : "amount",
                "fr" : "montant",
                "ja" : "金額"
            },
            "label": "Amount",
            "type": "number",
            "min_value": 0
        },
        {
            "id": 1237,
            "name": "name",
            "label": {
                "en" : "Name",
                "fr" : "Nom",
                "ja" : "名前"
            },
            "type": "text"
        }
    ]
}
```

### Multilingual (back)

Modify the node.js application to allow for multilingual capabilities

### Server-side validation

Modify the node.js application to make server side validation on min and max bounds.
Return the appropriate HTTP code and message if the values were invalid