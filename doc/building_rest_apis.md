> To design a restful API you must understand your business process (You can't design what you can't describe)

 REpresentional State Transfer (REST)

> mdn REST (Representational State Transfer) refers to a group of software architecture design constraints that bring about efficient, reliable and scalable distributed systems.
> 

REST is a data architecture and design methodology, not a specific technology.

REST is not new but became very popular with the growth of so called single page applications (SPAs) and Native Apps where instead of generating whole new pages on each request (which is resource intensive) the web client or SPA consisting of HTML, CSS and JavaScript after an initial download instead uses a URI to fetch only the data needed for a specific state of the client (SPA). So any changes made are communicated between client and server via a data object, not the entire set of files. A SPA can also do updates without re-rendering all of the page.

### Application Programming Interface (API)

> mdn An API (Application Programming Interface) is a set of features and rules that exist inside a software program (the application) enabling interaction with it through software - as opposed to a human user interface. The API can be seen as a simple contract (the interface) between the application offering it and other items, such as third party software or hardware.
> 

In the context of REST APIs an API is the collection of tools used to access and work with REST resources through URIs and verbs (GET, POST, PUT, PATCH, DELETE). [See also Free Codecamp article](https://www.freecodecamp.org/news/http-request-methods-explained/)

A REST API can be shared by many different types of clients.

### Universal Resource Identifyer (URI)

- Universal Resource Identifyer (URI) is a compact sequence of characters that identifies an abstract or physical resource. This could include a REST resource or SSN etc
- Universal Resource Locator (URL) is a subset of aURI that identifies a resource and explains **how to access** that resource by providing an explicit method like https:// or ftp://. All URLs are URIs but not all URIs are URLs.
- Universal Resource Name (URN) can be a URL but does not have to be if excluding the protocol. The difference is that a URN always identifies a resource (...home.html#posts) whereas a URL does not have to (...home.html). A URL can be a URN and both are URIs.

## The 6 Constraints of REST

A REST API fulfills the following constraints:

1. Client-Server architecture. The client manages user interface concerns while the server manages data storage concerns. Allows for a highly portable systems where many different types of clients can be served by the same REST API.
2. Statelessness. No client context or information, aka "state", can be stored on the server between requests. All requests sent from a client must be self-contained and complete.
3. Cachability. All REST responses must be clearly marked as cacheable or not cacheable.
4. Layered System. The client cannot know, and should not care, whether it's connected directly to the server or to an intermediary like a CDN or a mirror. This ensures scalability and helps with security.
5. Code on Demand. Servers are allowed to transfer executable code like JavaScript and compiled components to clients.
6. Uniform Interface
	6.1 Resource Identification in Request. The URI request must specify what resource it operates against and the response format.
	6.2 Resource manipulation through representations. Once a client has a representation of a resource, it can modify or delete it.
	6.3 Self-descriptive messages. Sending and receiving REST data each message must describe it's data format.
	6.4 Hypermedia as the engine of application state. Once the client has access to a REST service, it should be able to discover all available resources and methods through the hyperlinks provided.

> A RESTful API is a REST API (conforming to the above constraints) that you can access using the HTTP(S) protocol. The web platform is what makes it RESTful.
> 

Even if many RESTful APIs are available on the web most of them implements authentication, authorization and rate limits.

## Requests

A REST request consists of a method and a resource URI. Ste standard methods are GET, POST, PUT, PATCH, DELETE, OPTIONS and HEAD.

If a REST API is not documented you may be able to use the discovery aspect that, if implemented, allows a human or a machine to learn how to use a specific REST API.

### Resource vs Representation

> Fielding The key abstraction of information in REST is a resource. Any information that can be named can be a resource: a document or image, a temporal service, a collection of other resources, a non-virtual object... and so on. A resource is a conceptual mapping to a set of entities, not the entity that corresponds to the mapping at any particular point in time.
> 

Resources can be both collections and singletons. The structure of a REST API typically enables narrowing resource requests from collections to singletons by increased specificity in the URI route `Bookcase/books/red/1`.

> Fielding REST components perform actions on a resource by using a representation to capture the current or intended state of that resource and transferring that representation between components.
> 

This means that the REST server will typically create a unique representation that can be modified to fit specifications.

The resource is the data contained at the end of the resource URI, the representation is the litteral representation of the data obtained on access.

### HTTP methods or Verbs

- To tell the server what type of request is being sent.
- GET is the most common and is used to return data from the provided URI. On success should return `200 OK` and on failure should return `404 Not Found`.
- To send data you use POST, PUT and PATCH. POST ist the most commonly used and is typically used in REST APIs to create a resource and add it to a collection. On success it should return `201 Created` and on failure is should return `401 Unauthorized`, `409 Conflict` or `404 Not Found`. PUT is used to replace the full contents of an existing resource with the data sent along with the request. On success it should return `200 OK` and on failure is should return `401 Unauthorized`, `404 Not Found` or `405 Method Not Allowed`. PATCH is used to modify and existing resource. Can contain info on how to modify the resource. It returns the same status codes as PUT. DELETE is used to delete a single resource based on id. On success it should return `200 OK` and on failure is should return `401 Unauthorized`, `404 Not Found`. Sent to a collection resource it should return `405 Method Not Allowed`. OPTIONS returns the communication options (what methods are available) for the target resource and HEAD returns the headers from a resource.

## Response

### The Response Header

The most inportant part of a http header comes first namely the http status message `HTTP/1.1 200 OK`.

If you issue a HEAD request to a resource you would typically get back info on what verbs you can use for that resource (Allow) and how the returned data is represented (Content-Type). Sometimes you also have `content-encoding: gzip` to tell you content below is gzipped. The allow header might change depending on your authorization header.

### HTTP Status Messages

Wikipedia list of HTTP codes with description can be found [here](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes).

HTTP codes are split into five main groups:

|Codes| Description   |
|-----|---------------|
| 1xx | Information, not widely used   |
| 2xx | Success       |
| 200 | OK            |
| 201 | Created       |
| 204 | No content    |
| 3xx | Redirection   |
| 301 | Moved Permanently |
|302/303| Found at this other URL |
| 307 | Temporary Redirect |
| 308 | Resume Incomplete  |
| 4xx | Client errors      |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 405 | Method Not Allowed |
| 5xx | Server errors      |
| 500 | Internal Server Error |
| 502 | Bad Gateway |
| 503 | Service Unavailable |
