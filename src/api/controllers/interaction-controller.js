import InteractionService from '../../services/interaction-service.js';

export const getInteractions = async (req, res) => {
    const { page = 0, total = 10 } = req.query;

    try {
        const interactionService = new InteractionService(); 
        const interactions = await interactionService.getInteractions(page, total);
        
        res.json({ ok: true, interactions });
    } catch (err) {
        console.error(err);
        res.status(500).json({ ok: false, error: String(err) });
    }
}