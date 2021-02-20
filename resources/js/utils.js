export function filesize(size) {
  const i = Math.floor(Math.log(size) / Math.log(1024));
  return (
    (size / Math.pow(1024, i)).toFixed(2) * 1 +
    ' ' +
    ['B', 'kB', 'MB', 'GB', 'TB'][i]
  );
}

export function getUrlQuery(param = null) {
  let url = new URL(window.location.href);
  if(param) {
    return url.searchParams.get(param)
  }

  let params = {};
  url.searchParams.forEach( (v, k) =>  (params[k] = v) );
  return params;
}

// Transforms key/value pairs to FormData() object
export function toFormData(values = {}, method = 'POST') {
  const formData = new FormData();
  for (const field of Object.keys(values)) {
    formData.append(field, values[field]);
  }

  // NOTE: When working with Laravel PUT/PATCH requests and FormData
  // you SHOULD send POST request and fake the PUT request like this.
  // More info: http://stackoverflow.com/q/50691938
  if (method.toUpperCase() === 'PUT') {
    formData.append('_method', 'PUT');
  }

  return formData;
}
