import { serve } from '@hono/node-server'
import { Hono } from 'hono'

const app = new Hono()

let todo = [{"id": 1, "title":"todo"}, {"id": 2, "title": "test"}] // Initial data example

app.get('/todo', (c) => {
  return c.json(todo)
})

app.post('/todo', async (c) => {
  let body = await c.req.json()
  todo.push(body)
  return c.json(todo)
})

app.put('/todo/:id', async (c) => {
  const id = parseInt(c.req.param('id'))
  let body = await c.req.json()
  for (let i = 0; i < todo.length; i++) {
    if (todo[i].id == id) {
      todo[i].title = body.title
    }
  }
  return c.json(todo)
})

app.delete('/todo/:id', async (c) => {
  let id = parseInt(c.req.param('id'))
  let newTodo = todo.filter(data => data.id != id)
  return c.json(newTodo)
})


const port = 3000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
