import { Database } from '@supabase/supabase-js';

export type Tables = {
  users: {
    Row: {
      id: string;
      email: string;
      role: string;
      created_at: string;
      updated_at: string;
    };
    Insert: {
      id?: string;
      email: string;
      role: string;
      created_at?: string;
      updated_at?: string;
    };
    Update: {
      id?: string;
      email?: string;
      role?: string;
      updated_at?: string;
    };
  };
  artists: {
    Row: {
      id: string;
      user_id: string;
      name: string;
      profile_picture?: string;
      bio?: string;
      created_at: string;
      updated_at: string;
    };
    Insert: {
      id?: string;
      user_id: string;
      name: string;
      profile_picture?: string;
      bio?: string;
      created_at?: string;
      updated_at?: string;
    };
    Update: {
      id?: string;
      user_id?: string;
      name?: string;
      profile_picture?: string;
      bio?: string;
      updated_at?: string;
    };
  };
};

export type DbResult<T> = T extends PromiseLike<infer U> ? U : never;
export type DbResultOk<T> = T extends PromiseLike<{ data: infer U }> ? Exclude<U, null> : never;
export type DbResultErr = PostgrestError;

export type PostgrestError = {
  message: string;
  details: string;
  hint: string;
  code: string;
};

// Extend the supabase Database type
export type CustomDatabase = Database & {
  public: {
    Tables: {
      users: Tables['users'];
      artists: Tables['artists'];
    };
  };
}; 