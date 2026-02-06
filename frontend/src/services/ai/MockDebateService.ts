import { DebateService } from './DebateService';
import { DebateResponse } from '@/types/debate';

const mockResponses: Record<string, DebateResponse> = {
  stoic: {
    position:
      'Your argument centers on the desire to control outcomes that are, by nature, beyond your influence. The Stoic framework distinguishes sharply between what is "up to us" and what is not. Your reasoning conflates external circumstances with internal judgments about those circumstances.',
    coreReasoning:
      'The foundation of your claim rests on an assumption that external conditions determine well-being. Epictetus would counter that it is not events themselves that disturb us, but our judgments about them. The strength of an argument lies not in its ability to change the world, but in its alignment with reason and virtue. Your premise, while emotionally compelling, lacks the discipline of separating preferred outcomes from necessary truths.',
    whereYoureRight:
      'You correctly identify a genuine tension in how society allocates resources and attention. The observation itself is grounded in reality, and your concern for fairness reflects a commitment to justice, which is a virtue worth defending. Your willingness to engage with complexity rather than retreat to simplistic answers is itself a mark of philosophical seriousness.',
    whereYoureWeak:
      'Your argument assumes that the solution must come from structural change alone, neglecting the role of individual agency and internal transformation. You also conflate correlation with causation in several key claims. The emotional urgency of your position, while understandable, weakens its logical structure and makes it vulnerable to counter-examples you have not addressed.',
    strongerVersion:
      'A more robust version of your argument would acknowledge the limits of external reform while still advocating for it. You might argue that while individual virtue is necessary, it is insufficient without systemic support, and that both must be pursued simultaneously. Ground your claims in specific evidence rather than general sentiment, and address the strongest objections before your critics do.',
  },
  'free-market': {
    position:
      'Your argument proposes a solution that relies heavily on centralized intervention. From a classical liberal perspective, the key question is whether this intervention creates more problems than it solves, and whether voluntary exchange and competition might achieve the same goals more efficiently and with fewer unintended consequences.',
    coreReasoning:
      'Markets function as information systems. Prices communicate scarcity, preferences, and opportunity costs in ways that no central authority can replicate. Your argument implicitly assumes that a planning body possesses sufficient knowledge to allocate resources better than distributed decision-making. Hayek demonstrated that this knowledge problem is not merely practical but fundamental. The information needed to make optimal decisions is dispersed among millions of actors and cannot be aggregated without significant loss.',
    whereYoureRight:
      'You rightly point out that markets can produce outcomes that feel unjust or that fail to account for externalities. Not all goods are efficiently allocated by price mechanisms, and public goods present genuine challenges that voluntary exchange alone may not resolve. Your concern for those who lack bargaining power is legitimate and should not be dismissed.',
    whereYoureWeak:
      'Your proposal does not adequately account for the incentive structures it would create. Government interventions often produce moral hazard, rent-seeking behavior, and regulatory capture. You also underestimate the adaptive capacity of markets when property rights are well-defined and contracts are enforced. The historical track record of the interventions you propose deserves more critical examination than you have given it.',
    strongerVersion:
      'Rather than proposing direct intervention, consider arguing for reforms that align incentives with outcomes. For example, you might advocate for removing barriers to entry that protect incumbents, or for transparent information requirements that empower consumers. Frame your argument around correcting specific market failures rather than replacing market mechanisms, and you will find broader agreement and fewer unintended consequences.',
  },
  'social-justice': {
    position:
      'Your argument engages with a real phenomenon but frames it in terms that obscure the structural forces at work. A social justice analysis requires examining how power, history, and institutional design shape the conditions you describe. Individual choices occur within systems, and those systems are not neutral.',
    coreReasoning:
      'The liberal framework of individual choice, while valuable, is insufficient for explaining patterns of inequality that persist across generations and demographics. When the same groups consistently end up at the bottom of social hierarchies, the explanation cannot be reduced to personal decisions. Structural analysis reveals how policies, cultural norms, and institutional practices create and reproduce disadvantage in ways that are often invisible to those who benefit from them.',
    whereYoureRight:
      'Your emphasis on personal responsibility contains an important truth. Agency matters, and denying it can be as harmful as ignoring structural barriers. You are also correct that solutions must be practical and implementable, not merely aspirational. The recognition that policy must be grounded in real-world constraints strengthens your position considerably.',
    whereYoureWeak:
      'Your analysis treats existing distributions of power and resources as natural rather than constructed. You do not adequately address how historical injustices continue to shape present outcomes through accumulated advantage and disadvantage. Additionally, your framework lacks an intersectional lens, meaning it fails to account for how multiple forms of marginalization compound one another in ways that simple category-by-category analysis cannot capture.',
    strongerVersion:
      'Integrate structural awareness into your argument without abandoning the insights about agency that make your position compelling. Acknowledge that structures constrain choices without eliminating them, and propose interventions that expand genuine choice for those who currently have the fewest options. Use specific data and case studies rather than abstract principles, and engage directly with the strongest critiques of your position from those most affected by the issues you describe.',
  },
};

export class MockDebateService implements DebateService {
  async generateResponse(personaId: string, _argument: string): Promise<DebateResponse> {
    // Simulate network latency
    await new Promise((resolve) => setTimeout(resolve, 1200));

    return mockResponses[personaId] || mockResponses['stoic'];
  }
}
