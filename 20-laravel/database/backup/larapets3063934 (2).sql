-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 28-11-2025 a las 22:16:23
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `larapets3063934`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `adoptions`
--

CREATE TABLE `adoptions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `pet_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `adoptions`
--

INSERT INTO `adoptions` (`id`, `user_id`, `pet_id`, `created_at`, `updated_at`) VALUES
(1, 2, 4, '2025-10-30 01:08:10', '2025-10-30 01:08:10');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2025_10_22_214820_create_pets_table', 1),
(5, '2025_10_22_214923_create_adoptions_table', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pets`
--

CREATE TABLE `pets` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL DEFAULT 'no-image.png',
  `kind` varchar(255) NOT NULL,
  `weight` double NOT NULL,
  `age` int(11) NOT NULL,
  `breed` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `status` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `pets`
--

INSERT INTO `pets` (`id`, `name`, `image`, `kind`, `weight`, `age`, `breed`, `location`, `description`, `active`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Firulais', 'no-image.png', 'Dog', 7.6, 2, 'French bulldog', 'Paris', 'Black dog, so charming, lovely', 1, 0, '2025-10-30 01:08:10', '2025-10-30 01:08:10'),
(2, 'Killer', 'no-image.png', 'Dog', 18, 6, 'Cane Corso', 'Milan', 'Explosive & be careful with it, Danger', 1, 0, '2025-10-30 01:08:10', '2025-10-30 01:08:10'),
(3, 'George', 'no-image.png', 'Pig', 30, 4, 'Mini pig', 'Wembley', 'Cute & lovely mini pig, friendly with kids', 1, 0, '2025-10-30 01:08:10', '2025-10-30 01:08:10'),
(4, 'Anubis', 'no-image.png', 'Cat', 10, 3, 'Persa', 'Cairo', 'Majestic cat, calm and quiet', 1, 1, '2025-10-30 01:08:10', '2025-10-30 01:08:10'),
(5, 'Nemo', 'no-image.png', 'Pig', 6.1, 7, 'Göttingen Mini Pig', 'Sauerfort', 'Est eum explicabo sit harum quam rerum est necessitatibus.', 1, 0, '2025-10-30 01:08:55', '2025-10-30 01:08:55'),
(6, 'Mateo', 'no-image.png', 'Dog', 8.3, 0, 'German Shepherd Dog', 'Darrylchester', 'Voluptate iste accusamus quae et et impedit.', 1, 0, '2025-10-30 01:08:55', '2025-10-30 01:08:55'),
(7, 'Juan', 'no-image.png', 'Cat', 1.2, 3, 'Mixed Breed (Criollo)', 'North Geraldside', 'Consequatur est esse tempora veniam sequi harum sed maiores eligendi.', 1, 0, '2025-10-30 01:08:55', '2025-10-30 01:08:55'),
(8, 'Pili', 'no-image.png', 'Cat', 4.7, 9, 'Tortoiseshell Cat', 'Lake Annabellstad', 'Debitis quas quia itaque ut voluptas ut atque.', 1, 0, '2025-10-30 01:08:55', '2025-10-30 01:08:55'),
(9, 'Tita', 'no-image.png', 'Dog', 9.8, 0, 'Beagle', 'New Stacyberg', 'Sit ducimus tempore quidem omnis nostrum ut cupiditate.', 1, 0, '2025-10-30 01:08:55', '2025-10-30 01:08:55'),
(10, 'Lola', 'no-image.png', 'Cat', 2.7, 7, 'Maine Coon', 'Robertsshire', 'Qui harum esse molestiae et exercitationem et aliquam quis.', 1, 0, '2025-10-30 01:08:55', '2025-10-30 01:08:55'),
(11, 'Oliver', 'no-image.png', 'Pig', 3.4, 1, 'Juliana Pig', 'Joshuachester', 'Tempore aut quia sapiente eum repudiandae id expedita ut corrupti sed.', 1, 0, '2025-10-30 01:08:55', '2025-10-30 01:08:55'),
(12, 'Milo', 'no-image.png', 'Dog', 5.7, 7, 'Boston Terrier', 'Watershaven', 'Ea ab rerum quia est fuga.', 1, 0, '2025-10-30 01:08:55', '2025-10-30 01:08:55'),
(13, 'Mateo', 'no-image.png', 'Cat', 6.3, 0, 'Exotic Shorthair', 'Port Ethanmouth', 'Exercitationem nobis cum error velit minima.', 1, 0, '2025-10-30 01:08:55', '2025-10-30 01:08:55'),
(14, 'Stich', 'no-image.png', 'Dog', 5.1, 4, 'Beagle', 'South Timmothyfurt', 'Expedita nulla itaque et saepe nesciunt cumque rerum.', 1, 0, '2025-10-30 01:08:55', '2025-10-30 01:08:55'),
(15, 'Lilo', 'no-image.png', 'Bird', 3.8, 6, 'Canaries', 'North Justonburgh', 'In veniam exercitationem quia a recusandae ipsum laborum aut error nihil.', 1, 0, '2025-10-30 01:08:55', '2025-10-30 01:08:55'),
(16, 'Boss', 'no-image.png', 'Pig', 7, 7, 'Yucatan Mini Pig', 'North Orlo', 'Recusandae sed aspernatur odio iste voluptatem.', 1, 0, '2025-10-30 01:08:55', '2025-10-30 01:08:55'),
(17, 'Golfo', 'no-image.png', 'Pig', 3.5, 4, 'Miniature Pig (Mini Pig)', 'South Dannie', 'Et at facere qui omnis minima eius dolor pariatur autem et beatae.', 1, 0, '2025-10-30 01:08:55', '2025-10-30 01:08:55'),
(18, 'Princesa', 'no-image.png', 'Cat', 2.4, 0, 'Mixed Breed (Criollo)', 'New Leora', 'Suscipit quis quos sed dolorem sed officiis rem autem.', 1, 0, '2025-10-30 01:08:55', '2025-10-30 01:08:55'),
(19, 'Noé', 'no-image.png', 'Pig', 4.3, 1, 'Yucatan Mini Pig', 'Flatleychester', 'Error et qui itaque unde omnis sunt architecto non et.', 1, 0, '2025-10-30 01:08:55', '2025-10-30 01:08:55'),
(20, 'Pelusa', 'no-image.png', 'Pig', 1.4, 7, 'Kunekune', 'Kirkfurt', 'Consectetur natus quia voluptatem aut delectus est.', 1, 0, '2025-10-30 01:08:55', '2025-10-30 01:08:55'),
(21, 'Niebla', 'no-image.png', 'Pig', 7.8, 4, 'Vietnamese Pot Bellied', 'Lake Greggmouth', 'Distinctio et ea totam error eius iure.', 1, 0, '2025-10-30 01:08:55', '2025-10-30 01:08:55'),
(22, 'Sol', 'no-image.png', 'Pig', 0.4, 4, 'Göttingen Mini Pig', 'Brandiburgh', 'Voluptates modi eveniet quo mollitia temporibus.', 1, 0, '2025-10-30 01:08:55', '2025-10-30 01:08:55'),
(23, 'Brownie', 'no-image.png', 'Dog', 0.1, 5, 'Pit Bull', 'Willburgh', 'Ipsam in alias laborum odit laudantium quibusdam praesentium unde.', 1, 0, '2025-10-30 01:08:55', '2025-10-30 01:08:55'),
(24, 'Zeus', 'no-image.png', 'Dog', 9.8, 1, 'Doberman Pinscher', 'North Mae', 'Perspiciatis ducimus facilis nesciunt necessitatibus unde.', 1, 0, '2025-10-30 01:08:55', '2025-10-30 01:08:55'),
(25, 'Michi', 'no-image.png', 'Dog', 0.8, 8, 'Beagle', 'New Jayde', 'Provident quam harum mollitia temporibus eum ut amet consectetur veritatis molestiae.', 1, 0, '2025-10-30 01:08:55', '2025-10-30 01:08:55'),
(26, 'Toby', 'no-image.png', 'Bird', 6.7, 6, 'Finches (especially Zebra Finches)', 'Wisozkstad', 'Nulla quo sunt excepturi in pariatur.', 1, 0, '2025-10-30 01:08:55', '2025-10-30 01:08:55'),
(27, 'Rey', 'no-image.png', 'Bird', 9.8, 3, 'Canaries', 'North Kylerton', 'Atque ipsam iusto ad magni sit pariatur.', 1, 0, '2025-10-30 01:08:55', '2025-10-30 01:08:55'),
(28, 'Gordito', 'no-image.png', 'Dog', 4.2, 4, 'Cocker Spaniel', 'Schimmelside', 'Reiciendis porro qui vero voluptatem architecto omnis veritatis recusandae aliquid eaque placeat.', 1, 0, '2025-10-30 01:08:55', '2025-10-30 01:08:55'),
(29, 'Fiona', 'no-image.png', 'Bird', 9.8, 5, 'Cockatoos', 'Herzogside', 'Et autem ipsa alias exercitationem aspernatur et voluptas consequatur laboriosam.', 1, 0, '2025-10-30 01:08:55', '2025-10-30 01:08:55'),
(30, 'Mami', 'no-image.png', 'Cat', 7.7, 5, 'Exotic Shorthair', 'North Kristofer', 'Vel nihil reiciendis qui totam alias omnis perspiciatis eos tenetur debitis.', 1, 0, '2025-10-30 01:08:55', '2025-10-30 01:08:55'),
(31, 'Bimba', 'no-image.png', 'Pig', 9.9, 8, 'Kunekune', 'Lake Kaleb', 'Saepe qui accusantium ipsa omnis delectus dolorum repellendus.', 1, 0, '2025-10-30 01:08:55', '2025-10-30 01:08:55'),
(32, 'Juan', 'no-image.png', 'Pig', 0.1, 8, 'Juliana Pig', 'Port Blairborough', 'Voluptas enim consequatur at aut ut hic.', 1, 0, '2025-10-30 01:08:55', '2025-10-30 01:08:55'),
(33, 'Leo', 'no-image.png', 'Cat', 4.9, 5, 'Calico', 'Theabury', 'Sunt id ut illum hic tenetur quos.', 1, 0, '2025-10-30 01:08:55', '2025-10-30 01:08:55'),
(34, 'Lola', 'no-image.png', 'Pig', 9.4, 8, 'Vietnamese Pot Bellied', 'Travonstad', 'Ut nihil magni ea sint eum ullam quos sed est.', 1, 0, '2025-10-30 01:08:55', '2025-10-30 01:08:55'),
(35, 'Lola', 'no-image.png', 'Bird', 4.9, 3, 'Amazon Parrots', 'Rutherfordton', 'Dolores pariatur atque nisi aut ipsa iste quidem numquam sapiente reiciendis.', 1, 0, '2025-10-30 01:08:55', '2025-10-30 01:08:55'),
(36, 'Flaca', 'no-image.png', 'Dog', 4, 0, 'Cocker Spaniel', 'Lake Rylanmouth', 'Quibusdam quia voluptas ea voluptatibus quia ex aliquam.', 1, 0, '2025-10-30 01:08:55', '2025-10-30 01:08:55'),
(37, 'Pili', 'no-image.png', 'Bird', 3, 6, 'Conures (small to medium parrots)', 'East Alexton', 'Veritatis accusantium sint sit ex velit cum rerum ipsa voluptatem dolor.', 1, 0, '2025-10-30 01:08:55', '2025-10-30 01:08:55'),
(38, 'Tinto', 'no-image.png', 'Bird', 9.7, 3, 'Budgerigars (Parakeets)', 'New Millieport', 'Sed doloribus fugit quisquam voluptas dolores illum dolorem dolorum dolor.', 1, 0, '2025-10-30 01:08:55', '2025-10-30 01:08:55'),
(39, 'Trufa', 'no-image.png', 'Cat', 7.2, 1, 'Himalayan', 'Hintzton', 'Et quaerat magni ipsa earum tenetur.', 1, 0, '2025-10-30 01:08:55', '2025-10-30 01:08:55'),
(40, 'Stich', 'no-image.png', 'Cat', 4, 9, 'Tortoiseshell Cat', 'Port Coltenberg', 'Quidem et ut cum ipsa.', 1, 0, '2025-10-30 01:08:55', '2025-10-30 01:08:55'),
(41, 'Papi', 'no-image.png', 'Bird', 7.2, 0, 'Amazon Parrots', 'Brannonville', 'Aut animi et quis rem aliquam.', 1, 0, '2025-10-30 01:08:55', '2025-10-30 01:08:55'),
(42, 'Pili', 'no-image.png', 'Pig', 8.9, 8, 'Kunekune', 'Jaysonshire', 'Nemo modi veniam quis molestiae nisi impedit quo ullam quia.', 1, 0, '2025-10-30 01:08:55', '2025-10-30 01:08:55'),
(43, 'Hera', 'no-image.png', 'Bird', 1.1, 8, 'Budgerigars (Parakeets)', 'Danikafurt', 'Vero reprehenderit voluptatum consequatur ipsam et.', 1, 0, '2025-10-30 01:08:55', '2025-10-30 01:08:55'),
(44, 'Corazón', 'no-image.png', 'Cat', 3.1, 1, 'Mixed Breed (Criollo)', 'East Zechariahmouth', 'Et quia unde perspiciatis quas similique omnis eum provident et.', 1, 0, '2025-10-30 01:08:55', '2025-10-30 01:08:55'),
(45, 'Sasha', 'no-image.png', 'Bird', 7.9, 6, 'Budgerigars (Parakeets)', 'Violetview', 'Asperiores doloremque vero neque explicabo occaecati in.', 1, 0, '2025-10-30 01:08:55', '2025-10-30 01:08:55'),
(46, 'Blanca', 'no-image.png', 'Pig', 2.6, 5, 'Miniature Pig (Mini Pig)', 'Kshlerinshire', 'Sed quod qui nisi quam aut blanditiis.', 1, 0, '2025-10-30 01:08:55', '2025-10-30 01:08:55'),
(47, 'Kenai', 'no-image.png', 'Bird', 7.6, 5, 'Amazon Parrots', 'Boscoland', 'Qui omnis veritatis maiores quas delectus impedit qui dolores repellat.', 1, 0, '2025-10-30 01:08:55', '2025-10-30 01:08:55'),
(48, 'Sultán', 'no-image.png', 'Bird', 6.4, 9, 'African Greys', 'South Mckenzie', 'Nobis molestiae voluptas eius ab maxime sit at voluptas deserunt veritatis facilis.', 1, 0, '2025-10-30 01:08:55', '2025-10-30 01:08:55'),
(49, 'Stich', 'no-image.png', 'Dog', 2.2, 0, 'Cocker Spaniel', 'Simeonchester', 'Animi blanditiis expedita velit provident.', 1, 0, '2025-10-30 01:08:55', '2025-10-30 01:08:55'),
(50, 'Nemo', 'no-image.png', 'Pig', 2.7, 7, 'Vietnamese Pot Bellied', 'Tavaresmouth', 'Ipsa quia repellat et quas aliquid illo blanditiis et nesciunt iste pariatur.', 1, 0, '2025-10-30 01:08:55', '2025-10-30 01:08:55'),
(51, 'Coco', 'no-image.png', 'Pig', 5.1, 4, 'Juliana Pig', 'Lake Crystalshire', 'Et culpa dolore enim sed est ex tenetur consequatur in et.', 1, 0, '2025-10-30 01:08:55', '2025-10-30 01:08:55'),
(52, 'Paco', 'no-image.png', 'Bird', 7.6, 9, 'Budgerigars (Parakeets)', 'Delbertmouth', 'Quos quo unde perspiciatis ut.', 1, 0, '2025-10-30 01:08:55', '2025-10-30 01:08:55'),
(53, 'Teka', 'no-image.png', 'Pig', 4.1, 1, 'Yucatan Mini Pig', 'Melvinfurt', 'Libero consequatur eius dolore eaque vero autem.', 1, 0, '2025-10-30 01:08:55', '2025-10-30 01:08:55'),
(54, 'Buddy', 'no-image.png', 'Cat', 2.6, 2, 'Turkish Angora', 'Lake Omerton', 'In corporis iusto nulla sit qui ut repellat aliquam vero expedita.', 1, 0, '2025-10-30 01:08:55', '2025-10-30 01:08:55');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('YfgF4FwQtyXskkl7vnijIH3YDGaHUXugynK3wscX', 55, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoibTh1OXB6bEI1b0Y3a3VCbWpwb0x5Y2daSFgxczVNeVhQSDBWVjgzOCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mjc6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC91c2VycyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fXM6NTA6ImxvZ2luX3dlYl81OWJhMzZhZGRjMmIyZjk0MDE1ODBmMDE0YzdmNThlYTRlMzA5ODlkIjtpOjU1O30=', 1764364317);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `document` bigint(20) NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `gender` varchar(255) NOT NULL,
  `birthdate` date NOT NULL,
  `photo` varchar(255) NOT NULL DEFAULT 'no-photo.png',
  `phone` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `role` varchar(255) NOT NULL DEFAULT 'Customer',
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `document`, `fullname`, `gender`, `birthdate`, `photo`, `phone`, `email`, `email_verified_at`, `password`, `active`, `role`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 75000001, 'John Wick', 'Male', '1964-09-12', 'jhonWick.webp', '310000000', 'johnw@mail.com', NULL, '$2y$12$UvgZ7F36oBxvnFdLG6JLduU0ZaZ/NnAr9p5IKG45nVxLntH0JGG/a', 1, 'Administrator', NULL, '2025-10-30 01:08:10', '2025-11-22 01:14:05'),
(2, 75000002, 'Lara Croft', 'Female', '1990-02-14', 'no-photo.png', '31000000054', 'larac@email.com', NULL, '$2y$12$2UIbjD4Cu9kvvpeQhxsKXeaTUp8PWcrT/YtiFueyqAgVDGbmd/kJ.', 1, 'Customer', NULL, '2025-10-30 01:08:10', '2025-11-22 00:53:58'),
(3, 75475687, 'Tommie Hegmann', 'Male', '2007-03-24', '6902742a8d3c8_male.jpg', '310152695', 'paucek.rosa@example.org', '2025-10-30 01:08:11', '$2y$12$Sc3jk3iMpErec6vfAKnIWOHbtMKF6nC12nfKA3uVFhAejYytxrVg6', 1, 'Customer', 'CIi4TuLZoF', '2025-10-30 01:08:55', '2025-10-30 01:08:55'),
(4, 75768587, 'Hertha Wisoky', 'Female', '1970-05-12', '6902742b70f90_female.jpg', '310455579', 'mina82@example.com', '2025-10-30 01:08:11', '$2y$12$Sc3jk3iMpErec6vfAKnIWOHbtMKF6nC12nfKA3uVFhAejYytxrVg6', 1, 'Customer', 'gXbjXhFK6y', '2025-10-30 01:08:55', '2025-10-30 01:08:55'),
(5, 75813925, 'Wyman Rodriguez', 'Male', '2003-09-04', '6902742befdba_male.jpg', '310919896', 'stokes.christophe@example.org', '2025-10-30 01:08:12', '$2y$12$Sc3jk3iMpErec6vfAKnIWOHbtMKF6nC12nfKA3uVFhAejYytxrVg6', 1, 'Customer', 'BJWHMIQL55', '2025-10-30 01:08:55', '2025-10-30 01:08:55'),
(6, 75299621, 'Deshawn Roberts', 'Male', '2015-02-16', '6902742c72643_male.jpg', '310923809', 'felicia16@example.org', '2025-10-30 01:08:12', '$2y$12$Sc3jk3iMpErec6vfAKnIWOHbtMKF6nC12nfKA3uVFhAejYytxrVg6', 1, 'Customer', 'z828uMprvH', '2025-10-30 01:08:55', '2025-10-30 01:08:55'),
(7, 75955696, 'Ardith Labadie', 'Female', '2006-07-24', '6902742cef3ef_female.jpg', '310233285', 'jensen.predovic@example.net', '2025-10-30 01:08:13', '$2y$12$Sc3jk3iMpErec6vfAKnIWOHbtMKF6nC12nfKA3uVFhAejYytxrVg6', 1, 'Customer', '4IGhU7jc6D', '2025-10-30 01:08:55', '2025-10-30 01:08:55'),
(8, 75758638, 'Nathanael Zieme', 'Male', '2006-08-08', '6902742dba543_male.jpg', '310480662', 'nico.muller@example.net', '2025-10-30 01:08:14', '$2y$12$Sc3jk3iMpErec6vfAKnIWOHbtMKF6nC12nfKA3uVFhAejYytxrVg6', 1, 'Customer', 'Sd25LPO9Xh', '2025-10-30 01:08:55', '2025-10-30 01:08:55'),
(9, 75691051, 'Antone Lang', 'Male', '1994-03-27', '6902742e86385_male.jpg', '310639806', 'tgerhold@example.com', '2025-10-30 01:08:15', '$2y$12$Sc3jk3iMpErec6vfAKnIWOHbtMKF6nC12nfKA3uVFhAejYytxrVg6', 1, 'Customer', 'kmjkKQtQUe', '2025-10-30 01:08:55', '2025-10-30 01:08:55'),
(10, 75463608, 'Brendon Jacobs', 'Male', '1995-03-30', '6902742f46dc4_male.jpg', '310839584', 'watsica.sienna@example.net', '2025-10-30 01:08:16', '$2y$12$Sc3jk3iMpErec6vfAKnIWOHbtMKF6nC12nfKA3uVFhAejYytxrVg6', 1, 'Customer', 'Cy4V6oKQnC', '2025-10-30 01:08:55', '2025-10-30 01:08:55'),
(11, 75555069, 'Garrett Langworth', 'Male', '1990-07-20', '690274300bfa2_male.jpg', '310819938', 'senger.arno@example.org', '2025-10-30 01:08:16', '$2y$12$Sc3jk3iMpErec6vfAKnIWOHbtMKF6nC12nfKA3uVFhAejYytxrVg6', 1, 'Customer', 'Vbfl6cgx0w', '2025-10-30 01:08:55', '2025-10-30 01:08:55'),
(12, 75414909, 'Thaddeus Jones', 'Male', '1998-08-14', '69027430c0cc4_male.jpg', '310605101', 'kromaguera@example.com', '2025-10-30 01:08:17', '$2y$12$Sc3jk3iMpErec6vfAKnIWOHbtMKF6nC12nfKA3uVFhAejYytxrVg6', 1, 'Customer', 'BLlYKk9yEI', '2025-10-30 01:08:55', '2025-10-30 01:08:55'),
(13, 75475047, 'Grady Hayes', 'Male', '2000-04-10', '690274318aa7f_male.jpg', '310146057', 'ccarroll@example.com', '2025-10-30 01:08:18', '$2y$12$Sc3jk3iMpErec6vfAKnIWOHbtMKF6nC12nfKA3uVFhAejYytxrVg6', 1, 'Customer', '7WKV6hPSqb', '2025-10-30 01:08:55', '2025-10-30 01:08:55'),
(14, 75714434, 'Sharon Fadel', 'Female', '1996-10-21', '6902743253f0a_female.jpg', '310447302', 'nolan.olga@example.org', '2025-10-30 01:08:19', '$2y$12$Sc3jk3iMpErec6vfAKnIWOHbtMKF6nC12nfKA3uVFhAejYytxrVg6', 1, 'Customer', 'SLhUMEz2Os', '2025-10-30 01:08:55', '2025-10-30 01:08:55'),
(15, 75969042, 'Sterling Kozey', 'Male', '1993-05-19', '690274331cc07_male.jpg', '310565500', 'ngislason@example.net', '2025-10-30 01:08:19', '$2y$12$Sc3jk3iMpErec6vfAKnIWOHbtMKF6nC12nfKA3uVFhAejYytxrVg6', 1, 'Customer', 'PLFBpW7R7g', '2025-10-30 01:08:55', '2025-10-30 01:08:55'),
(16, 75872398, 'Carlee Powlowski', 'Female', '2000-10-19', '69027433e9144_female.jpg', '310233189', 'medhurst.esperanza@example.net', '2025-10-30 01:08:20', '$2y$12$Sc3jk3iMpErec6vfAKnIWOHbtMKF6nC12nfKA3uVFhAejYytxrVg6', 1, 'Customer', 'nOlxprmrhI', '2025-10-30 01:08:55', '2025-10-30 01:08:55'),
(17, 75565898, 'Bernhard Bosco', 'Male', '1977-06-28', '69027434c1555_male.jpg', '310714909', 'yweissnat@example.org', '2025-10-30 01:08:21', '$2y$12$Sc3jk3iMpErec6vfAKnIWOHbtMKF6nC12nfKA3uVFhAejYytxrVg6', 1, 'Customer', 'LhPpS106FV', '2025-10-30 01:08:55', '2025-10-30 01:08:55'),
(18, 75509791, 'Nelson Hegmann', 'Male', '2003-05-09', '69027435b3f42_male.jpg', '310616140', 'emiliano.goldner@example.com', '2025-10-30 01:08:22', '$2y$12$Sc3jk3iMpErec6vfAKnIWOHbtMKF6nC12nfKA3uVFhAejYytxrVg6', 1, 'Customer', 'fyXjKSzXR4', '2025-10-30 01:08:55', '2025-10-30 01:08:55'),
(19, 75323208, 'Aubrey Schmitt', 'Female', '2013-10-04', '6902743692308_female.jpg', '310106985', 'michaela54@example.org', '2025-10-30 01:08:23', '$2y$12$Sc3jk3iMpErec6vfAKnIWOHbtMKF6nC12nfKA3uVFhAejYytxrVg6', 1, 'Customer', 'u6vBAtAAZn', '2025-10-30 01:08:55', '2025-10-30 01:08:55'),
(20, 75558572, 'Rhiannon Cronin', 'Male', '2019-01-02', '69027437a64a7_male.jpg', '310872188', 'ghowell@example.org', '2025-10-30 01:08:24', '$2y$12$Sc3jk3iMpErec6vfAKnIWOHbtMKF6nC12nfKA3uVFhAejYytxrVg6', 1, 'Customer', '6PR6dc3tap', '2025-10-30 01:08:55', '2025-10-30 01:08:55'),
(21, 75700629, 'Oleta Bernhard', 'Female', '1985-09-12', '69027438d1a89_female.jpg', '310319590', 'camden11@example.org', '2025-10-30 01:08:25', '$2y$12$Sc3jk3iMpErec6vfAKnIWOHbtMKF6nC12nfKA3uVFhAejYytxrVg6', 1, 'Customer', 'Fs1h5wX4d0', '2025-10-30 01:08:55', '2025-10-30 01:08:55'),
(22, 75135817, 'Jonatan Ledner', 'Male', '1982-05-27', '69027439a2ad8_male.jpg', '310185932', 'king.mackenzie@example.com', '2025-10-30 01:08:26', '$2y$12$Sc3jk3iMpErec6vfAKnIWOHbtMKF6nC12nfKA3uVFhAejYytxrVg6', 1, 'Customer', 'fC7epFJtJ9', '2025-10-30 01:08:55', '2025-10-30 01:08:55'),
(23, 75848991, 'Maria Daniela', 'Female', '2008-08-16', '6902743a68045_female.jpg', '310213703', 'mitchell.vidal@example.org', '2025-10-30 01:08:27', '$2y$12$Sc3jk3iMpErec6vfAKnIWOHbtMKF6nC12nfKA3uVFhAejYytxrVg6', 1, 'Customer', 'ld9tUwCYns', '2025-10-30 01:08:55', '2025-10-30 02:44:18'),
(24, 75073985, 'Michele Kunze', 'Female', '1986-01-23', '6902743b39aa6_female.jpg', '310505555', 'von.edward@example.net', '2025-10-30 01:08:28', '$2y$12$Sc3jk3iMpErec6vfAKnIWOHbtMKF6nC12nfKA3uVFhAejYytxrVg6', 1, 'Customer', 'ZFd3tTFBD2', '2025-10-30 01:08:55', '2025-10-30 01:08:55'),
(25, 75946532, 'Justice Runolfsdottir', 'Male', '2022-09-19', '6902743c030d5_male.jpg', '310566698', 'reichel.elmira@example.net', '2025-10-30 01:08:28', '$2y$12$Sc3jk3iMpErec6vfAKnIWOHbtMKF6nC12nfKA3uVFhAejYytxrVg6', 1, 'Customer', 'FwvXE8goAh', '2025-10-30 01:08:55', '2025-10-30 01:08:55'),
(26, 75803479, 'Ward Hilpert', 'Male', '2006-11-24', '6902743cca086_male.jpg', '310904063', 'ygleichner@example.com', '2025-10-30 01:08:29', '$2y$12$Sc3jk3iMpErec6vfAKnIWOHbtMKF6nC12nfKA3uVFhAejYytxrVg6', 1, 'Customer', 'gboofqkc6C', '2025-10-30 01:08:55', '2025-10-30 01:08:55'),
(27, 75837850, 'Aliza Kiehn', 'Female', '2025-06-07', '6902743d952c5_female.jpg', '310188533', 'frice@example.net', '2025-10-30 01:08:30', '$2y$12$Sc3jk3iMpErec6vfAKnIWOHbtMKF6nC12nfKA3uVFhAejYytxrVg6', 1, 'Customer', 'm3Z1Y7RSn3', '2025-10-30 01:08:55', '2025-10-30 01:08:55'),
(28, 75016938, 'Raul Miller', 'Male', '1995-07-01', '6902743e6039b_male.jpg', '310959455', 'qkrajcik@example.org', '2025-10-30 01:08:31', '$2y$12$Sc3jk3iMpErec6vfAKnIWOHbtMKF6nC12nfKA3uVFhAejYytxrVg6', 1, 'Customer', 'NZYS4tyeiH', '2025-10-30 01:08:55', '2025-10-30 01:08:55'),
(29, 75220263, 'Sheila Will', 'Female', '1970-12-26', '6902743f3f438_female.jpg', '310692095', 'clemmie.heaney@example.com', '2025-10-30 01:08:32', '$2y$12$Sc3jk3iMpErec6vfAKnIWOHbtMKF6nC12nfKA3uVFhAejYytxrVg6', 1, 'Customer', 'j2V5ACQEQ7', '2025-10-30 01:08:55', '2025-10-30 01:08:55'),
(30, 75776215, 'Layla Wehner', 'Female', '1977-04-17', '6902744009c1f_female.jpg', '310323562', 'kshlerin.patrick@example.net', '2025-10-30 01:08:32', '$2y$12$Sc3jk3iMpErec6vfAKnIWOHbtMKF6nC12nfKA3uVFhAejYytxrVg6', 1, 'Customer', 'qiLXCBVggY', '2025-10-30 01:08:55', '2025-10-30 01:08:55'),
(31, 75247099, 'Nola Monahan', 'Female', '2020-12-06', '69027440c4243_female.jpg', '310746590', 'nicholaus58@example.org', '2025-10-30 01:08:33', '$2y$12$Sc3jk3iMpErec6vfAKnIWOHbtMKF6nC12nfKA3uVFhAejYytxrVg6', 1, 'Customer', 'GzCGJ5zncx', '2025-10-30 01:08:55', '2025-10-30 01:08:55'),
(32, 75199000, 'Glenna Wehner', 'Female', '2015-05-21', '690274419858a_female.jpg', '310514620', 'agustin.altenwerth@example.org', '2025-10-30 01:08:34', '$2y$12$Sc3jk3iMpErec6vfAKnIWOHbtMKF6nC12nfKA3uVFhAejYytxrVg6', 1, 'Customer', '6Mlvazw7lX', '2025-10-30 01:08:55', '2025-10-30 01:08:55'),
(33, 75395778, 'Chloe Johnson', 'Female', '2019-03-07', '6902744254524_female.jpg', '310599927', 'wolf.richie@example.net', '2025-10-30 01:08:35', '$2y$12$Sc3jk3iMpErec6vfAKnIWOHbtMKF6nC12nfKA3uVFhAejYytxrVg6', 1, 'Customer', 'ISrereAkMY', '2025-10-30 01:08:55', '2025-10-30 01:08:55'),
(34, 75645730, 'Chelsey Olson', 'Male', '1976-02-20', '6902744334f0d_male.jpg', '310628578', 'jerde.scot@example.org', '2025-10-30 01:08:35', '$2y$12$Sc3jk3iMpErec6vfAKnIWOHbtMKF6nC12nfKA3uVFhAejYytxrVg6', 1, 'Customer', 'FFNrzfE3EW', '2025-10-30 01:08:55', '2025-10-30 01:08:55'),
(35, 75919009, 'Kenna Corkery', 'Female', '2021-01-25', '69027443e3e58_female.jpg', '310978353', 'isabell50@example.net', '2025-10-30 01:08:36', '$2y$12$Sc3jk3iMpErec6vfAKnIWOHbtMKF6nC12nfKA3uVFhAejYytxrVg6', 1, 'Customer', 'v5zuYHNlAe', '2025-10-30 01:08:55', '2025-10-30 01:08:55'),
(36, 75480825, 'Kacie Goyette', 'Female', '2013-12-27', '69027444bc01d_female.jpg', '310919757', 'vdare@example.org', '2025-10-30 01:08:37', '$2y$12$Sc3jk3iMpErec6vfAKnIWOHbtMKF6nC12nfKA3uVFhAejYytxrVg6', 1, 'Customer', 'VfDwofjf0R', '2025-10-30 01:08:55', '2025-10-30 01:08:55'),
(37, 75116912, 'Margarita Mills', 'Female', '1990-07-16', '690274457f004_female.jpg', '310047898', 'hayes.naomie@example.com', '2025-10-30 01:08:38', '$2y$12$Sc3jk3iMpErec6vfAKnIWOHbtMKF6nC12nfKA3uVFhAejYytxrVg6', 1, 'Customer', 'IgFJ3dT55Y', '2025-10-30 01:08:55', '2025-10-30 01:08:55'),
(38, 75323275, 'Trisha Balistreri', 'Female', '1970-09-20', '6902744656cde_female.jpg', '310859010', 'brooke71@example.com', '2025-10-30 01:08:39', '$2y$12$Sc3jk3iMpErec6vfAKnIWOHbtMKF6nC12nfKA3uVFhAejYytxrVg6', 1, 'Customer', 's7ngjlBgwQ', '2025-10-30 01:08:55', '2025-10-30 01:08:55'),
(39, 75276607, 'Daren Luettgen', 'Male', '1975-07-05', '690274471ab78_male.jpg', '310758872', 'jordi.dickens@example.org', '2025-10-30 01:08:39', '$2y$12$Sc3jk3iMpErec6vfAKnIWOHbtMKF6nC12nfKA3uVFhAejYytxrVg6', 1, 'Customer', 'c3VGo9aAKZ', '2025-10-30 01:08:55', '2025-10-30 01:08:55'),
(40, 75393525, 'Theresa Hodkiewicz', 'Female', '2011-12-07', '69027447d9618_female.jpg', '310059916', 'susie.stiedemann@example.com', '2025-10-30 01:08:40', '$2y$12$Sc3jk3iMpErec6vfAKnIWOHbtMKF6nC12nfKA3uVFhAejYytxrVg6', 1, 'Customer', 'rO3ofrXLIw', '2025-10-30 01:08:55', '2025-10-30 01:08:55'),
(41, 75941340, 'Breanna Conn', 'Female', '2009-03-19', '69027448da817_female.jpg', '310479802', 'ubogisich@example.com', '2025-10-30 01:08:41', '$2y$12$Sc3jk3iMpErec6vfAKnIWOHbtMKF6nC12nfKA3uVFhAejYytxrVg6', 1, 'Customer', '7NddJsBVzq', '2025-10-30 01:08:55', '2025-10-30 01:08:55'),
(42, 75443291, 'Margarette Ortiz', 'Female', '2020-09-07', '69027449b3493_female.jpg', '310466527', 'sipes.jany@example.org', '2025-10-30 01:08:42', '$2y$12$Sc3jk3iMpErec6vfAKnIWOHbtMKF6nC12nfKA3uVFhAejYytxrVg6', 1, 'Customer', 'Opmz0tcG1k', '2025-10-30 01:08:55', '2025-10-30 01:08:55'),
(43, 75510743, 'Lola Rutherford', 'Female', '2014-09-11', '6902744ac2b54_female.jpg', '310789534', 'ullrich.lucinda@example.org', '2025-10-30 01:08:43', '$2y$12$Sc3jk3iMpErec6vfAKnIWOHbtMKF6nC12nfKA3uVFhAejYytxrVg6', 1, 'Customer', 'rFWkOjsfGs', '2025-10-30 01:08:55', '2025-10-30 01:08:55'),
(44, 75868136, 'Bruce Orn', 'Male', '2010-08-11', '6902744ba8c53_male.jpg', '310069604', 'marilou.raynor@example.org', '2025-10-30 01:08:44', '$2y$12$Sc3jk3iMpErec6vfAKnIWOHbtMKF6nC12nfKA3uVFhAejYytxrVg6', 1, 'Customer', 'QFwkjllQat', '2025-10-30 01:08:55', '2025-10-30 01:08:55'),
(45, 75687491, 'Emilia Dietrich', 'Female', '2023-01-03', '6902744cb4f6b_female.jpg', '310721982', 'tparker@example.com', '2025-10-30 01:08:46', '$2y$12$Sc3jk3iMpErec6vfAKnIWOHbtMKF6nC12nfKA3uVFhAejYytxrVg6', 1, 'Customer', 'YAOQOeXiKP', '2025-10-30 01:08:55', '2025-10-30 01:08:55'),
(46, 75411064, 'Ladarius Gaylord', 'Male', '1995-08-12', '6902744e2e389_male.jpg', '310701492', 'geovanny.feeney@example.com', '2025-10-30 01:08:47', '$2y$12$Sc3jk3iMpErec6vfAKnIWOHbtMKF6nC12nfKA3uVFhAejYytxrVg6', 1, 'Customer', '9RGc7VBCIo', '2025-10-30 01:08:55', '2025-10-30 01:08:55'),
(47, 75172546, 'Vena McGlynn', 'Female', '1973-06-01', '6902744f54b7e_female.jpg', '310956088', 'bessie.vandervort@example.net', '2025-10-30 01:08:48', '$2y$12$Sc3jk3iMpErec6vfAKnIWOHbtMKF6nC12nfKA3uVFhAejYytxrVg6', 1, 'Customer', '3s3DW15jtE', '2025-10-30 01:08:55', '2025-10-30 01:08:55'),
(48, 75475373, 'May Sipes', 'Female', '2006-07-06', '69027450a9613_female.jpg', '310435038', 'dfeil@example.com', '2025-10-30 01:08:50', '$2y$12$Sc3jk3iMpErec6vfAKnIWOHbtMKF6nC12nfKA3uVFhAejYytxrVg6', 1, 'Customer', 'g9n2dHjc3W', '2025-10-30 01:08:55', '2025-10-30 01:08:55'),
(49, 75763055, 'Elody Gibson', 'Female', '1991-07-27', '6902745280cb5_female.jpg', '310398943', 'theresia.parisian@example.net', '2025-10-30 01:08:51', '$2y$12$Sc3jk3iMpErec6vfAKnIWOHbtMKF6nC12nfKA3uVFhAejYytxrVg6', 1, 'Customer', 'COfe20bM1q', '2025-10-30 01:08:55', '2025-10-30 01:08:55'),
(50, 75198901, 'Orion Jacobson', 'Male', '1995-02-11', '69027453a19d3_male.jpg', '310130143', 'lfeest@example.net', '2025-10-30 01:08:52', '$2y$12$Sc3jk3iMpErec6vfAKnIWOHbtMKF6nC12nfKA3uVFhAejYytxrVg6', 1, 'Customer', 'qgOpMbK38a', '2025-10-30 01:08:55', '2025-10-30 01:08:55'),
(51, 75801673, 'Madelyn DuBuque', 'Female', '1971-01-23', '69027454e9d4c_female.jpg', '310015307', 'merritt.haley@example.org', '2025-10-30 01:08:53', '$2y$12$Sc3jk3iMpErec6vfAKnIWOHbtMKF6nC12nfKA3uVFhAejYytxrVg6', 1, 'Customer', '6kercCdlRn', '2025-10-30 01:08:55', '2025-10-30 01:08:55'),
(52, 75402568, 'Cordell Kulas', 'Male', '1970-12-17', '69027455f18a4_male.jpg', '310231289', 'cgerhold@example.com', '2025-10-30 01:08:55', '$2y$12$Sc3jk3iMpErec6vfAKnIWOHbtMKF6nC12nfKA3uVFhAejYytxrVg6', 1, 'Customer', 'KxKkWsiCgm', '2025-10-30 01:08:55', '2025-10-30 01:08:55'),
(54, 100467894, 'Jorge Nitales', 'male', '1985-06-12', 'no-photo.png', '3157394567', 'nitales@mail.com', NULL, '$2y$12$s7H.9vcXbqVtBIDuV/cgmuXNq96DJsodpNVdo4Grh2BDHAkdwQA7e', 2, 'Customer', NULL, '2025-11-13 03:03:16', '2025-11-13 03:03:16'),
(55, 1002632907, 'Miguel Loaiza', 'male', '2002-10-03', 'perfil_miguel.jpg', '3122353357', 'miguell02794@gmail.com', NULL, '$2y$12$UvgZ7F36oBxvnFdLG6JLduU0ZaZ/NnAr9p5IKG45nVxLntH0JGG/a', 1, 'Administrator', 'Ats5mGwCwVlDeYv50pwav5VvzK3vMxvonBSXnWt9b3pYLwncqw6ZWGgEhV2L', '2025-11-13 18:27:43', '2025-11-13 18:57:08'),
(56, 1002645897, 'Guts Berserk', 'Male', '1997-05-21', '1763648469.jpg', '3122358749', 'guts02@mail.com', NULL, '$2y$12$2MgdMRDjIIQuY4eUQ1RDOu8UgTqlsmTuAHlqd3iokAPFlgu87iFBG', 1, 'Customer', NULL, '2025-11-20 19:21:09', '2025-11-20 19:21:09'),
(60, 1002632908, 'Luis Loaiza', 'Male', '2002-10-03', '1763653975.jpg', '3122353381', 'luismi02794@gmail.com', NULL, '$2y$12$tpc1x14hzpoyjGOGy/2C.u0XpPRup1x7EDt32LE4iFllBrERDZkiq', 1, 'Customer', NULL, '2025-11-20 20:52:55', '2025-11-20 20:52:55'),
(61, 1002632931, 'Zoro Roronoa', 'Male', '1997-04-18', '1763755171.jpg', '3122353368', 'zoro@mail.com', NULL, '$2y$12$KU138mKrmRKy/DGKTXWICO5T4QSn9361w5WFUDyhmpm6sJXbNBgVy', 1, 'Customer', NULL, '2025-11-22 00:59:32', '2025-11-22 00:59:32'),
(62, 1002632967, 'Perdido Japones', 'Male', '1996-05-16', '1763755533.jpg', '3122353310', 'perdido@mail.com', NULL, '$2y$12$vxYBTBGkwqAxulWIBIVItOtz3LhG5RDQr6RVLZI8DxIiqGRaD52cC', 1, 'Customer', NULL, '2025-11-22 01:05:34', '2025-11-22 01:05:34');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `adoptions`
--
ALTER TABLE `adoptions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `adoptions_user_id_foreign` (`user_id`),
  ADD KEY `adoptions_pet_id_foreign` (`pet_id`);

--
-- Indices de la tabla `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indices de la tabla `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indices de la tabla `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indices de la tabla `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indices de la tabla `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indices de la tabla `pets`
--
ALTER TABLE `pets`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_document_unique` (`document`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `adoptions`
--
ALTER TABLE `adoptions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `pets`
--
ALTER TABLE `pets`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `adoptions`
--
ALTER TABLE `adoptions`
  ADD CONSTRAINT `adoptions_pet_id_foreign` FOREIGN KEY (`pet_id`) REFERENCES `pets` (`id`),
  ADD CONSTRAINT `adoptions_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
