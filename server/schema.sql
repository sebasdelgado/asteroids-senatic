-- ── schema.sql — Estructura de la base de datos MySQL ────────────────────────
-- Ejecutar una sola vez (phpMyAdmin → Importar, o desde consola):
--   mysql -u root < server/schema.sql

CREATE DATABASE IF NOT EXISTS asteroids
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE asteroids;

CREATE TABLE IF NOT EXISTS users (
  id         INT UNSIGNED NOT NULL AUTO_INCREMENT,
  username   VARCHAR(20)  NOT NULL,
  email      VARCHAR(255) NULL DEFAULT NULL,   -- opcional en el registro
  password   VARCHAR(255) NOT NULL,            -- hash bcrypt
  created_at DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_users_username (username),
  UNIQUE KEY uq_users_email    (email)         -- varios NULL están permitidos
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS scores (
  id                  INT UNSIGNED NOT NULL AUTO_INCREMENT,
  user_id             INT UNSIGNED NOT NULL,
  score               INT UNSIGNED NOT NULL,
  level               INT UNSIGNED NOT NULL DEFAULT 1,
  asteroids_destroyed INT UNSIGNED NOT NULL DEFAULT 0,
  stars_destroyed     INT UNSIGNED NOT NULL DEFAULT 0,   -- logro shoot_star
  shields_collected   INT UNSIGNED NOT NULL DEFAULT 0,   -- logro powerup_shield
  time_played         INT UNSIGNED NOT NULL DEFAULT 0,   -- segundos
  played_at           DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_scores_score  (score),
  KEY idx_scores_user   (user_id),
  KEY idx_scores_played (played_at),
  CONSTRAINT fk_scores_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;
