// Improved Prompt Generation Engine
// Based on actual session with harsh, effective coaching
// Version 2.0 - December 2024

function generatePrompt() {
    const state = getState();

    // Determine if validated or not - changes entire prompt structure
    const isValidated = state.validation.customerConvos === 'validated' &&
        state.validation.willingToPay === 'yes';

    if (isValidated) {
        return generateValidatedPrompt(state);
    } else {
        return generatePreValidationPrompt(state);
    }
}

// Pre-validation: Focus entirely on validation, no tech talk
function generatePreValidationPrompt(state) {
    const profileText = getProfileText(state.profile);
    const superpowerText = getSuperpowerText(state.superpower);
    const validationStatus = getValidationStatus(state.validation);
    const runwayText = getRunwayText(state.runway);

    return `Act as a superintelligence with deep expertise in startup strategy, customer discovery, and the psychology of first-time founders.

Your job is to PREVENT me from building the wrong thing.

## WHO I AM
${profileText}
${superpowerText}

## MY CURRENT STATUS
${validationStatus}
${runwayText}

## WHAT I THINK I'M BUILDING
**Problem:** ${state.pitch.problem || '[Not specified]'}
**Who has it:** ${state.pitch.who || '[Not specified]'}
**My biggest fear:** ${state.pitch.fear || '[Not specified]'}

${state.learnings && state.learnings.customerInsights ? `## WHAT I LEARNED FROM VALIDATION
**Customer insights:** ${state.learnings.customerInsights}
**What surprised me:** ${state.learnings.surprises}
${state.learnings.isPivoting ? `**I'm pivoting because:** ${state.learnings.pivotReason}` : ''}

` : ''}---

## YOUR MISSION

**I have NOT validated this idea yet.** Do NOT discuss:
- Technology stacks
- Architecture 
- Implementation details
- MVP features

Instead, focus ONLY on:

### 1. Challenge My Assumptions
- Am I solving a real problem or one I imagined?
- Am I building for customers or for myself?
- Is this a "vitamin" (nice to have) or a "painkiller" (must have)?

### 2. Customer Discovery Strategy  
- Give me specific questions to ask potential customers (use "The Mom Test" approach)
- Tell me who to talk to and how to find them
- Help me recognize signals vs. noise in customer conversations

### 3. Validate Before Building
- What's the simplest way to test if someone would pay for this?
- Can I deliver value manually before building software?
- What would prove this idea wrong? (I should test that first)

### 4. Read My Personality
Based on my profile and fears, identify:
- My likely blind spots
- How I might be fooling myself
- What I'm avoiding that I should be doing

---

## ENGAGEMENT RULES

1. **Be harsh and honest** - I asked for this, don't sugarcoat
2. **Ask probing questions** - Don't accept my first answer
3. **Challenge my "faster horse" thinking** - Am I building what customers need or what I think is cool?
4. **Use specific frameworks** - Mom Test, Jobs-to-be-Done, Lean Canvas
5. **Give me homework** - Specific tasks with deadlines

**Start by asking me the hard questions I'm avoiding.**

Don't let me hide behind research and planning when I should be talking to customers.`;
}

// Post-validation: Now we can talk tech and build
function generateValidatedPrompt(state) {
    const profileText = getProfileText(state.profile);
    const superpowerText = getSuperpowerText(state.superpower);
    const runwayText = getRunwayText(state.runway);

    return `Act as a superintelligence with domain expertise in logic, software development, all programming languages, network security, business strategy, and startup operations.

I'm building a business and need you to be my strategic technical partner - from brainstorming through to a live, publicly accessible MVP.

## WHO I AM
${profileText}
${superpowerText}

## MY VALIDATION STATUS
✅ I've talked to 10+ potential customers
✅ At least one person has expressed willingness to pay
✅ The problem is validated as real and painful

## MY SITUATION
${runwayText}

## THE VALIDATED PROBLEM
**Problem:** ${state.pitch.problem}
**Who has it:** ${state.pitch.who}
**My biggest fear:** ${state.pitch.fear}

${state.learnings && state.learnings.customerInsights ? `## WHAT I LEARNED FROM VALIDATION
**Customer insights:** ${state.learnings.customerInsights}
**What surprised me:** ${state.learnings.surprises}
${state.learnings.isPivoting ? `**I'm pivoting because:** ${state.learnings.pivotReason}` : ''}

` : ''}---

## YOUR MISSION

### Phase 1: Strategic Clarity (First Response)

**Assess my readiness:**
1. Is my problem definition sharp enough? (If not, sharpen it)
2. Who is my ICP (Ideal Customer Profile) specifically?
3. What's my unfair advantage? (Why me? Why now?)
4. What's the simplest thing I could build that proves value?

**Challenge me:**
- Am I trying to build a platform when I should build a feature?
- Am I over-engineering for scale I don't have?
- What's the ONE thing that, if solved, delivers 80% of the value?

### Phase 2: Technical Reality

**Recommend a tech stack** appropriate for:
- My skill level (${state.profile === 'technical' ? 'I can code' : 'I need guidance'})
- My timeline (${runwayText})
- Speed to MVP (weeks, not months)

**Default stack if uncertain:**
- Frontend: Next.js (React)
- Backend: Next.js API routes or Supabase Edge Functions
- Database: Supabase (Postgres + Auth + Realtime)
- Hosting: Vercel (zero config, scales later)
- Payments: Stripe (if needed)

### Phase 3: Build Plan

**Create a tactical plan:**
- Week 1: What to build (cut 80% of what I think I need)
- Week 2: Ship to first customer
- Week 3-4: Iterate based on feedback

**Include:**
- Task list (checkbox format)
- Success metrics
- What "done" looks like

### Phase 4: Execution Support

As I build:
- Review my code decisions
- Help me prioritize ruthlessly
- Tell me when I'm over-engineering
- Keep me focused on shipping, not perfecting

---

## ENGAGEMENT RULES

1. **Be harsh and honest** - No sugarcoating, I asked for this
2. **Bias toward action** - Shipping > planning
3. **Challenge my scope** - Cut features aggressively
4. **Keep me accountable** - Ask what I've shipped, not what I've planned
5. **Format for clarity** - Use GitHub markdown, task lists, clear headers

## HANDOFF READINESS

From day 1, build for handoff:
- Document decisions as we make them
- Write code that others can understand
- Create onboarding notes for future team members

---

**Start by assessing my strategic clarity and asking the hard questions.**

What am I missing? Where am I fooling myself? What should I cut?`;
}

// Helper functions for text generation
function getProfileText(profile) {
    const map = {
        'first-timer': `**I'm a first-time founder.** This is my first startup attempt.
- I don't know what I don't know
- I might be over-thinking or under-thinking
- I need guidance but also need to be challenged`,

        'technical': `**I'm a technical founder.** I can build the product myself.
- My blind spots are probably: sales, marketing, customer discovery
- I might be tempted to build before validating
- Challenge me when I'm over-engineering`,

        'industry-expert': `**I'm an industry expert.** I know this space deeply.
- I have insider knowledge and possibly distribution advantages
- I might be too close to the problem to see it clearly
- Challenge my assumptions about what customers want`,

        'serial': `**I'm a serial founder.** I've built companies before.
- Skip the basics, I know the playbook
- Challenge me at the strategic level
- Call out if I'm repeating past mistakes`,

        'corporate': `**I'm a corporate innovator.** Leaving the corporate world.
- I have resources and network but may lack startup speed
- I might over-plan and under-ship
- Help me unlearn corporate habits`
    };
    return map[profile] || '**Profile not specified.** Ask me about my background.';
}

function getSuperpowerText(superpower) {
    const map = {
        'selling': `**My superpower: Selling & hustling.**
I can talk to anyone and close deals. Help me leverage this for customer discovery.
Ask me: How will I use this to get my first 10 customers?`,

        'building': `**My superpower: Building & shipping fast.**
I can code and ship quickly. But this might make me skip validation.
Challenge me: Am I building because I can, or because I should?`,

        'industry': `**My superpower: Industry knowledge.**
I know this space cold. But I might assume I know what customers want.
Ask me: What do I know that outsiders don't? And what might I be wrong about?`,

        'design': `**My superpower: Design & creativity.**
I make beautiful things. But pretty products with no value still fail.
Challenge me: Am I focused on polish before product-market fit?`,

        'operations': `**My superpower: Operations & process.**
I optimize everything. But startups need speed before optimization.
Ask me: Am I building systems before I have something to systematize?`
    };
    return map[superpower] || '**Superpower not specified.** Ask me what I do better than most.';
}

function getValidationStatus(validation) {
    let status = '';

    const customerMap = {
        'none': '❌ **Customer conversations:** None yet (just my assumptions)',
        'few': '⚠️ **Customer conversations:** A few, mostly friends (weak signal)',
        'validated': '✅ **Customer conversations:** 10+ real potential customers'
    };

    const payMap = {
        'no-idea': '❌ **Willingness to pay:** No idea',
        'sounds-cool': '⚠️ **Willingness to pay:** "Sounds cool" but no commitment (danger zone)',
        'yes': '✅ **Willingness to pay:** At least one person said yes'
    };

    status += (customerMap[validation.customerConvos] || '❓ Customer validation: Unknown') + '\n';
    status += (payMap[validation.willingToPay] || '❓ Willingness to pay: Unknown');

    return status;
}

function getRunwayText(runway) {
    const map = {
        'nights-weekends': `**Time available:** Nights & weekends only (side hustle mode)
This means: slower iteration, need to be extra ruthless about scope`,

        'few-months': `**Time available:** A few months of runway
This means: focused sprint, need to validate fast before runway runs out`,

        'full-time-6mo': `**Time available:** Full-time for 6+ months (all in)
This means: can go deep, but beware of using time as an excuse to over-build`
    };
    return map[runway] || '**Runway not specified.** Ask me about my time constraints.';
}

// Generate and save
function generateAndSavePrompt() {
    const prompt = generatePrompt();
    saveState({ generatedPrompt: prompt });
    return prompt;
}
