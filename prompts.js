// Prompt Generation Engine with Validation Gate
// Based on IMPROVEMENTS_NEEDED.md fixes

function generatePrompt() {
    const state = getState();

    // Base prompt with validation gate
    let prompt = `Act as a superintelligence with domain expertise in logic, software development, all programming languages, network security, business strategy, and startup operations.

I'm coding a business and need you to engage with me from the start, brainstorming and strategy level, through to coding and a live publicly accessible url: so remain grounded in tactics and technology stacks. We'll produce task lists, implementation plans, MVP walkthroughs, and derived knowledge items. Then code and test.

CRITICAL REQUIREMENTS:
1. Be harsh and honest in critique - no sugarcoating
2. Assume I'm aware of modern AI-assisted development tools (Codex, Cursor, Antigravity, etc.)
3. Goals will pivot as we conduct real-world research and testing
4. Continuously communicate your understanding and bring in decades of training and experience

VALIDATION GATE:
Do NOT discuss technology, stacks, or implementation until you have confirmed:
- I've talked to 10+ potential customers
- At least one person has expressed willingness to pay
- The problem is validated as real and painful

If these conditions aren't met, focus ONLY on validation strategy.

ENGAGEMENT STYLE:
- Format responses in GitHub-style markdown
- Use strategic frameworks (Lean Canvas, Jobs-to-be-Done, Traction/EOS, etc.)
- Provide tactical technology recommendations
- Ask probing questions to uncover blind spots
- Challenge assumptions directly

`;

    // Add founder context
    prompt += `MY CONTEXT:\n\n`;

    // Profile
    const profileMap = {
        'first-timer': 'I\'m a first-time founder attempting my first startup.',
        'technical': 'I\'m a technical founder who can build the product.',
        'industry-expert': 'I\'m an industry expert with deep domain knowledge.',
        'serial': 'I\'m a serial founder - I\'ve done this before.',
        'corporate': 'I\'m a corporate innovator leaving the corporate world.'
    };
    prompt += `**Who I am:** ${profileMap[state.profile] || 'Not specified'}\n\n`;

    // Superpower (with explicit instruction to ask, not assume)
    const superpowerMap = {
        'selling': 'selling and hustling',
        'building': 'building things and shipping products fast',
        'industry': 'industry knowledge - I know this space cold',
        'design': 'design and creativity - I make things beautiful',
        'operations': 'operations and process - I optimize everything'
    };
    const superpowerText = superpowerMap[state.superpower] || 'not specified';
    prompt += `**My superpower:** ${superpowerText}. Do not assume what this means - ask me directly how to leverage this while covering my gaps.\n\n`;

    // Validation status
    const customerMap = {
        'none': 'I haven\'t talked to any potential customers yet (just my own assumptions)',
        'few': 'I\'ve talked to a few people, mostly friends',
        'validated': 'I\'ve had 10+ real conversations with potential customers'
    };
    const payMap = {
        'no-idea': 'I have no idea if anyone would pay',
        'sounds-cool': 'People said it "sounds cool" but no commitment',
        'yes': 'At least one person has expressed willingness to pay'
    };
    prompt += `**Customer validation:** ${customerMap[state.validation.customerConvos] || 'Not specified'}\n`;
    prompt += `**Willingness to pay:** ${payMap[state.validation.willingToPay] || 'Not specified'}\n\n`;

    // Runway
    const runwayMap = {
        'nights-weekends': 'I can only work nights and weekends (side hustle mode)',
        'few-months': 'I have a few months of runway',
        'full-time-6mo': 'I can work full-time for 6+ months (all in)'
    };
    prompt += `**Time available:** ${runwayMap[state.runway] || 'Not specified'}\n\n`;

    // Business pitch
    prompt += `**The problem I'm solving:** ${state.pitch.problem}\n\n`;
    prompt += `**Who has this problem:** ${state.pitch.who}\n\n`;
    prompt += `**My biggest fear:** ${state.pitch.fear}\n\n`;

    // Final instruction
    prompt += `---

Begin by:
1. Assessing my strategic clarity (problem, ICP, unfair advantage)
2. Evaluating technical reality (MVP timeline, tech stack, scale assumptions)
3. Questioning go-to-market approach (first 10 customers, unit economics)
4. Checking handoff readiness (documentation, metrics, architecture clarity)

Remember: VALIDATION FIRST. If I haven't validated the problem with real customers, focus there before any technical discussion.`;

    return prompt;
}

// Generate and save prompt when called
function generateAndSavePrompt() {
    const prompt = generatePrompt();
    saveState({ generatedPrompt: prompt });
    return prompt;
}
