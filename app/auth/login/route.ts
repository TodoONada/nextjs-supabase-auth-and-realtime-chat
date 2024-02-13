import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    const requestUrl = new URL(request.url)
    const formData = await request.formData()
    const email = String(formData.get('email'))
    const password = String(formData.get('password'))
    const supabase = createRouteHandlerClient({ cookies })

    await supabase.auth.signInWithPassword({
        email,
        password,
    })

    return NextResponse.redirect(requestUrl.origin + '/profile', {
        status: 301,
    })
}