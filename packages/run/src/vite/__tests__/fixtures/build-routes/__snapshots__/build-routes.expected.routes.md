# Middleware
```js
// virtual:marko-run/__marko-run__middleware.js
import { normalize } from 'virtual:marko-run/internal';
import middleware4 from './src/routes/+middleware.ts';
import middleware5 from './src/routes/_protected/+middleware.ts';
import middleware7 from './src/routes/_protected/_home/+middleware.ts';
import middleware13 from './src/routes/_protected/_home/notes/$id/+middleware.ts';

export const mware4 = normalize(middleware4);
export const mware5 = normalize(middleware5);
export const mware7 = normalize(middleware7);
export const mware13 = normalize(middleware13);
```


# Route `/`
## Template
```marko
// virtual:marko-run/__marko-run__route__index.marko
import layout1 from './src/routes/+layout.marko';
import layout2 from './src/routes/_protected/_home/+layout.marko';
import page from './src/routes/_protected/_home/+page.marko';

<layout1 ...input>
	<layout2 ...input>
		<page ...input />
	</>
</>
```
## Handler
```js
// virtual:marko-run/__marko-run__route__index.js
import { call, pageResponse } from 'virtual:marko-run/internal';
import { mware4, mware5, mware7 } from 'virtual:marko-run/__marko-run__middleware.js';
import page from 'virtual:marko-run/__marko-run__route__index.marko?marko-server-entry';

export async function get1(context, buildInput) {
	const __page = () => pageResponse(page, buildInput());
	const __mware7 = () => call(mware7, __page, context);
	const __mware5 = () => call(mware5, __mware7, context);
	return call(mware4, __mware5, context);
}
```


# Route `/new`
## Template
```marko
// virtual:marko-run/__marko-run__route__new.marko
import layout1 from './src/routes/+layout.marko';
import layout2 from './src/routes/_protected/_home/+layout.marko';
import page from './src/routes/_protected/_home/new/+page.marko';

<layout1 ...input>
	<layout2 ...input>
		<page ...input />
	</>
</>
```
## Handler
```js
// virtual:marko-run/__marko-run__route__new.js
import { normalize, call, noContent, pageResponse } from 'virtual:marko-run/internal';
import { mware4, mware5, mware7 } from 'virtual:marko-run/__marko-run__middleware.js';
import { POST } from './src/routes/_protected/_home/new/+handler.post.ts';
import page from 'virtual:marko-run/__marko-run__route__new.marko?marko-server-entry';
export { default as meta2 } from './src/routes/_protected/_home/new/+meta.json';

const postHandler = normalize(POST);

export async function get2(context, buildInput) {
	const __page = () => pageResponse(page, buildInput());
	const __mware7 = () => call(mware7, __page, context);
	const __mware5 = () => call(mware5, __mware7, context);
	return call(mware4, __mware5, context);
}

export async function post2(context, buildInput) {
	const __postHandler = () => call(postHandler, noContent, context);
	const __mware7 = () => call(mware7, __postHandler, context);
	const __mware5 = () => call(mware5, __mware7, context);
	return call(mware4, __mware5, context);
}
```


# Route `/notes/$id`
## Template
```marko
// virtual:marko-run/__marko-run__route__notes__$.marko
import layout1 from './src/routes/+layout.marko';
import layout2 from './src/routes/_protected/_home/+layout.marko';
import page from './src/routes/_protected/_home/notes/$id/+page.marko';

<layout1 ...input>
	<layout2 ...input>
		<page ...input />
	</>
</>
```
## Handler
```js
// virtual:marko-run/__marko-run__route__notes__$.js
import { normalize, call, noContent, pageResponse } from 'virtual:marko-run/internal';
import { mware4, mware5, mware7, mware13 } from 'virtual:marko-run/__marko-run__middleware.js';
import { PUT, POST, DELETE } from './src/routes/_protected/_home/notes/$id/+handler.put_post_delete.ts';
import page from 'virtual:marko-run/__marko-run__route__notes__$.marko?marko-server-entry';

const putHandler = normalize(PUT);
const postHandler = normalize(POST);
const deleteHandler = normalize(DELETE);

export async function get3(context, buildInput) {
	const __page = () => pageResponse(page, buildInput());
	const __mware13 = () => call(mware13, __page, context);
	const __mware7 = () => call(mware7, __mware13, context);
	const __mware5 = () => call(mware5, __mware7, context);
	return call(mware4, __mware5, context);
}

export async function put3(context, buildInput) {
	const __putHandler = () => call(putHandler, noContent, context);
	const __mware13 = () => call(mware13, __putHandler, context);
	const __mware7 = () => call(mware7, __mware13, context);
	const __mware5 = () => call(mware5, __mware7, context);
	return call(mware4, __mware5, context);
}

export async function post3(context, buildInput) {
	const __postHandler = () => call(postHandler, noContent, context);
	const __mware13 = () => call(mware13, __postHandler, context);
	const __mware7 = () => call(mware7, __mware13, context);
	const __mware5 = () => call(mware5, __mware7, context);
	return call(mware4, __mware5, context);
}

export async function delete3(context, buildInput) {
	const __deleteHandler = () => call(deleteHandler, noContent, context);
	const __mware13 = () => call(mware13, __deleteHandler, context);
	const __mware7 = () => call(mware7, __mware13, context);
	const __mware5 = () => call(mware5, __mware7, context);
	return call(mware4, __mware5, context);
}
```


# Route `/notes/$id/comments`
## Handler
```js
// virtual:marko-run/__marko-run__route__notes__$__comments.js
import { normalize, call, noContent } from 'virtual:marko-run/internal';
import { mware4, mware5, mware7, mware13 } from 'virtual:marko-run/__marko-run__middleware.js';
import { PUT, POST, DELETE } from './src/routes/_protected/_home/notes/$id/comments/+handler.put_post_delete.ts';
export { default as meta4 } from './src/routes/_protected/_home/notes/$id/comments/+meta.ts';

const putHandler = normalize(PUT);
const postHandler = normalize(POST);
const deleteHandler = normalize(DELETE);

export async function put4(context) {
	const __putHandler = () => call(putHandler, noContent, context);
	const __mware13 = () => call(mware13, __putHandler, context);
	const __mware7 = () => call(mware7, __mware13, context);
	const __mware5 = () => call(mware5, __mware7, context);
	return call(mware4, __mware5, context);
}

export async function post4(context) {
	const __postHandler = () => call(postHandler, noContent, context);
	const __mware13 = () => call(mware13, __postHandler, context);
	const __mware7 = () => call(mware7, __mware13, context);
	const __mware5 = () => call(mware5, __mware7, context);
	return call(mware4, __mware5, context);
}

export async function delete4(context) {
	const __deleteHandler = () => call(deleteHandler, noContent, context);
	const __mware13 = () => call(mware13, __deleteHandler, context);
	const __mware7 = () => call(mware7, __mware13, context);
	const __mware5 = () => call(mware5, __mware7, context);
	return call(mware4, __mware5, context);
}
```


# Route `/callback/oauth2`
## Handler
```js
// virtual:marko-run/__marko-run__route__callback__oauth2.js
import { normalize, call, noContent } from 'virtual:marko-run/internal';
import { mware4 } from 'virtual:marko-run/__marko-run__middleware.js';
import { GET } from './src/routes/callback/oauth2/+handler.get.ts';

const getHandler = normalize(GET);

export async function get5(context) {
	const __getHandler = () => call(getHandler, noContent, context);
	return call(mware4, __getHandler, context);
}
```


# Route `/my`
## Template
```marko
// virtual:marko-run/__marko-run__route__my.marko
import layout1 from './src/routes/+layout.marko';
import page from './src/routes/my/+page.marko';

<layout1 ...input>
	<page ...input />
</>
```
## Handler
```js
// virtual:marko-run/__marko-run__route__my.js
import { normalize, call, pageResponse } from 'virtual:marko-run/internal';
import { mware4 } from 'virtual:marko-run/__marko-run__middleware.js';
import { GET } from './src/routes/my/+handler.get.ts';
import page from 'virtual:marko-run/__marko-run__route__my.marko?marko-server-entry';

const getHandler = normalize(GET);

export async function get6(context, buildInput) {
	const __page = () => pageResponse(page, buildInput());
	const __getHandler = () => call(getHandler, __page, context);
	return call(mware4, __getHandler, context);
}
```


# Route `/$$match`
## Handler
```js
// virtual:marko-run/__marko-run__route__$$.js
import { normalize, call, noContent } from 'virtual:marko-run/internal';
import { mware4 } from 'virtual:marko-run/__marko-run__middleware.js';
import { GET } from './src/routes/$$match/+handler.get.ts';

const getHandler = normalize(GET);

export async function get7(context) {
	const __getHandler = () => call(getHandler, noContent, context);
	return call(mware4, __getHandler, context);
}
```


# Special `404`
## Template
```marko
// virtual:marko-run/__marko-run__route__404.marko
import layout1 from './src/routes/+layout.marko';
import page from './src/routes/+404.marko';

<layout1 ...input>
	<page ...input />
</>
```


# Special `500`
## Template
```marko
// virtual:marko-run/__marko-run__route__500.marko
import layout1 from './src/routes/+layout.marko';
import page from './src/routes/+500.marko';

<layout1 ...input>
	<page ...input />
</>
```
