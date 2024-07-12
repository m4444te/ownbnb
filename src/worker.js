addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  if (request.method === 'OPTIONS') {
    // Handle CORS preflight request
    return new Response(null, {
      headers: getCORSHeaders()
    })
  } else if (request.method === 'POST') {
    const formData = await request.formData()
    const data = {}
    for (const entry of formData.entries()) {
      data[entry[0]] = entry[1]
    }

    const message = 'Your booking request has been submitted! We will get back to you quickly.'

    return new Response(JSON.stringify({
      success: true,
      message: message
    }), {
      headers: {
        ...getCORSHeaders(),
        'Content-Type': 'application/json'
      }
    })
  } else {
    return new Response('Method not allowed', { status: 405, headers: getCORSHeaders() })
  }
}

function getCORSHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  }
}
