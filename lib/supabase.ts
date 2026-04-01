import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://sbpilyghmvmoechmarrt.supabase.co'
const supabaseKey = 'sb_publishable_YljFArsmAPvtcxri3XZ40w_e7MRUTYT'

export const supabase = createClient(supabaseUrl, supabaseKey)