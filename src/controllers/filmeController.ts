

import type { Request, Response } from 'express';
import pool from '../config/database';

export const getFilmesController = async (req: Request, res: Response) => {
  try {

    // Buscar todos os filmes do banco de dados
    // e retornar como resposta JSON
    const result = await pool.query('SELECT * FROM filmes');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar filmes:', error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createFilmeController = async (req: Request, res: Response) => {
  try {
    const { nome, nota, ano, foto } = req.body;
    // Validar se a foto é uma string Base64 válida
    if (foto && !foto.startsWith('data:image/')) {
      return res.status(400).json({ error: "Formato de imagem inválido" });
    }
    // Inserir um novo filme no banco de dados
    // e retornar o filme criado como resposta JSON
    const result = await pool.query(
      'INSERT INTO filmes (nome, nota, ano, foto) VALUES ($1, $2, $3, $4) RETURNING *',
      [nome, nota, ano, foto]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao criar filme:', error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateFilmeController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { nome, nota, ano, foto } = req.body;

    // Update um filme existente no banco de dados
    // e retornar o filme atualizado como resposta JSON
    const result = await pool.query(
      'UPDATE filmes SET nome = $1, nota = $2, ano = $3, foto = $4 WHERE id = $5 RETURNING *',
      [nome, nota, ano, foto, id]
    );
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao atualizar filme:', error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteFilmeController = async (req: Request, res: Response) => {
  try { 
    const { id } = req.params;

    // Excluir um filme do banco de dados
    // e retornar um status 204 No Content
    await pool.query('DELETE FROM filmes WHERE id = $1', [id]);
    res.status(204).send();
  } catch (error) {
    console.error('Erro ao excluir filme:', error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};  
