-- MySQL Script generated by MySQL Workbench
-- Ter 11 Jun 2019 13:57:57 -03
-- Model: STAM-DER    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema stam
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema stam
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `stam` DEFAULT CHARACTER SET utf8 ;
USE `stam` ;

-- -----------------------------------------------------
-- Table `stam`.`GRAPH_QUERY`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `stam`.`GRAPH_QUERY` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `query` TEXT NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `description` TEXT NULL,
  `score` INT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `stam`.`SCORE_LEVEL`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `stam`.`SCORE_LEVEL` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `threshold_lower_bound` INT NOT NULL,
  `threshold_upper_bound` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `stam`.`CUSTOMER`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `stam`.`CUSTOMER` (
  `document_number` VARCHAR(45) NOT NULL,
  `name` VARCHAR(2555) NOT NULL,
  `date_of_birth` DATE NOT NULL,
  `country` CHAR(3) NOT NULL,
  `address_line` VARCHAR(255) NOT NULL,
  `nature` CHAR(1) NOT NULL,
  PRIMARY KEY (`document_number`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `stam`.`BENEFICIARY`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `stam`.`BENEFICIARY` (
  `bank_account_code` VARCHAR(255) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `country` CHAR(3) NOT NULL,
  `customer_document_number` VARCHAR(45) NULL,
  PRIMARY KEY (`bank_account_code`),
  CONSTRAINT `fk_BENEFICIARY_CUSTOMER1`
    FOREIGN KEY (`customer_document_number`)
    REFERENCES `stam`.`CUSTOMER` (`document_number`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_BENEFICIARY_CUSTOMER1_idx` ON `stam`.`BENEFICIARY` (`customer_document_number` ASC);


-- -----------------------------------------------------
-- Table `stam`.`PURPOSE`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `stam`.`PURPOSE` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `description` TEXT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `stam`.`TRANSACTION`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `stam`.`TRANSACTION` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `customer_document_number` VARCHAR(45) NOT NULL,
  `beneficiary_bank_account_code` VARCHAR(255) NOT NULL,
  `purpose_id` INT NOT NULL,
  `amount` DECIMAL NOT NULL,
  `currency` CHAR(3) NOT NULL,
  `date` DATE NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_TRANSACTION_CUSTOMER`
    FOREIGN KEY (`customer_document_number`)
    REFERENCES `stam`.`CUSTOMER` (`document_number`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_TRANSACTION_BENEFICIARY1`
    FOREIGN KEY (`beneficiary_bank_account_code`)
    REFERENCES `stam`.`BENEFICIARY` (`bank_account_code`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_TRANSACTION_PURPOSE1`
    FOREIGN KEY (`purpose_id`)
    REFERENCES `stam`.`PURPOSE` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_TRANSACTION_CUSTOMER_idx` ON `stam`.`TRANSACTION` (`customer_document_number` ASC);

CREATE INDEX `fk_TRANSACTION_BENEFICIARY1_idx` ON `stam`.`TRANSACTION` (`beneficiary_bank_account_code` ASC);

CREATE INDEX `fk_TRANSACTION_PURPOSE1_idx` ON `stam`.`TRANSACTION` (`purpose_id` ASC);


-- -----------------------------------------------------
-- Table `stam`.`REPORT`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `stam`.`REPORT` (
  `score` INT NOT NULL DEFAULT 0,
  `transaction_id` INT NOT NULL,
  `created_at` DATE NOT NULL,
  `updated_at` DATE NOT NULL,
  PRIMARY KEY (`transaction_id`),
  CONSTRAINT `fk_REPORTS_TRANSACTION1`
    FOREIGN KEY (`transaction_id`)
    REFERENCES `stam`.`TRANSACTION` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_REPORTS_TRANSACTION1_idx` ON `stam`.`REPORT` (`transaction_id` ASC);


-- -----------------------------------------------------
-- Table `stam`.`FLAG_TYPE`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `stam`.`FLAG_TYPE` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(255) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `stam`.`FLAG`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `stam`.`FLAG` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `description` TEXT NULL,
  `id_flag_type` INT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_FLAG_FLAG_TYPE1`
    FOREIGN KEY (`id_flag_type`)
    REFERENCES `stam`.`FLAG_TYPE` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_FLAG_FLAG_TYPE1_idx` ON `stam`.`FLAG` (`id_flag_type` ASC);


-- -----------------------------------------------------
-- Table `stam`.`FLAGS_ON_CUSTOMER`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `stam`.`FLAGS_ON_CUSTOMER` (
  `customer_document_number` VARCHAR(45) NOT NULL,
  `id_flag` INT NOT NULL,
  PRIMARY KEY (`customer_document_number`, `id_flag`),
  CONSTRAINT `fk_FLAGS_ON_CUSTOMER_CUSTOMER1`
    FOREIGN KEY (`customer_document_number`)
    REFERENCES `stam`.`CUSTOMER` (`document_number`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_FLAGS_ON_CUSTOMER_FLAG1`
    FOREIGN KEY (`id_flag`)
    REFERENCES `stam`.`FLAG` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_FLAGS_ON_CUSTOMER_FLAG1_idx` ON `stam`.`FLAGS_ON_CUSTOMER` (`id_flag` ASC);


-- -----------------------------------------------------
-- Table `stam`.`FLAGS_ON_REPORT`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `stam`.`FLAGS_ON_REPORT` (
  `id_flag` INT NOT NULL,
  `report_transaction_id` INT NOT NULL,
  PRIMARY KEY (`id_flag`, `report_transaction_id`),
  CONSTRAINT `fk_FLAGS_ON_REPORT_FLAG1`
    FOREIGN KEY (`id_flag`)
    REFERENCES `stam`.`FLAG` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_FLAGS_ON_REPORT_REPORTS1`
    FOREIGN KEY (`report_transaction_id`)
    REFERENCES `stam`.`REPORT` (`transaction_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_FLAGS_ON_REPORT_REPORTS1_idx` ON `stam`.`FLAGS_ON_REPORT` (`report_transaction_id` ASC);


-- -----------------------------------------------------
-- Table `stam`.`FLAGS_ON_BENEFICIARY`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `stam`.`FLAGS_ON_BENEFICIARY` (
  `id_flag` INT NOT NULL,
  `beneficiary_bank_account_code` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id_flag`, `beneficiary_bank_account_code`),
  CONSTRAINT `fk_FLAGS_ON_REPORT_FLAG10`
    FOREIGN KEY (`id_flag`)
    REFERENCES `stam`.`FLAG` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_FLAGS_ON_BENEFICIARY_BENEFICIARY1`
    FOREIGN KEY (`beneficiary_bank_account_code`)
    REFERENCES `stam`.`BENEFICIARY` (`bank_account_code`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `fk_FLAGS_ON_BENEFICIARY_BENEFICIARY1_idx` ON `stam`.`FLAGS_ON_BENEFICIARY` (`beneficiary_bank_account_code` ASC);


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
