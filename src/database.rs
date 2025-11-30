// src/database.rs
use anyhow::anyhow;
use sqlx::{PgPool, postgres::PgPoolOptions};
use std::env;

pub struct Database {
    pub pool: PgPool,
}

impl Database {
    pub async fn new() -> Result<Self, anyhow::Error> {
        let database_url =
            env::var("DATABASE_URL").map_err(|_| anyhow!("DATABASE_URL must be set"))?;

        // Create pool
        let pool = PgPoolOptions::new()
            .max_connections(10)
            .connect(&database_url)
            .await?;

        // Run migrations
        sqlx::migrate!("./migrations").run(&pool).await?;

        Ok(Self { pool })
    }
}
