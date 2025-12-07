-- ============================================================================
-- NIWAKI.CLOUD - COMPREHENSIVE TECHNIQUES DATABASE
-- ============================================================================
-- This file contains detailed pruning and training techniques for cloud pruning
-- Production-ready with extensive step-by-step guides and expert-level detail
-- ============================================================================

-- Drop existing techniques table if recreating
DROP TABLE IF EXISTS techniques CASCADE;

-- ============================================================================
-- TECHNIQUES TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS techniques (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(200) NOT NULL,
    japanese_name VARCHAR(100),
    japanese_characters VARCHAR(100),
    category VARCHAR(100) NOT NULL, -- 'pine', 'broadleaf', 'shaping', 'maintenance', 'training', 'protection', 'style'
    subcategory VARCHAR(100),

    -- Content
    summary TEXT NOT NULL,
    description TEXT NOT NULL,
    history_and_origin TEXT,
    philosophy TEXT,

    -- Difficulty and timing
    difficulty_level INTEGER CHECK (difficulty_level BETWEEN 1 AND 10),
    difficulty_description VARCHAR(100), -- 'Beginner', 'Intermediate', 'Advanced', 'Expert'
    time_required VARCHAR(200),
    time_per_tree VARCHAR(200),

    -- Seasonal timing
    primary_season VARCHAR(100),
    timing_details JSONB, -- { "northern_hemisphere": {...}, "southern_hemisphere": {...} }
    seasonal_calendar JSONB,
    
    -- Step-by-step guide
    preparation_steps JSONB,
    technique_steps JSONB,
    finishing_steps JSONB,
    aftercare TEXT,
    
    -- Tools and materials
    tools_required JSONB,
    optional_tools JSONB,
    materials_needed JSONB,
    
    -- Application
    applicable_species JSONB, -- Array of species slugs
    species_variations JSONB, -- Species-specific adjustments
    best_for TEXT,
    not_suitable_for TEXT,
    
    -- Tips and warnings
    pro_tips JSONB,
    common_mistakes JSONB,
    warning_signs TEXT,
    recovery_advice TEXT,
    
    -- Visual learning
    video_url VARCHAR(500),
    diagram_description TEXT,
    before_after_description TEXT,
    
    -- Related content
    related_techniques JSONB,
    prerequisite_techniques JSONB,
    
    -- Regional variations
    regional_variations JSONB,
    
    -- Metadata
    featured BOOLEAN DEFAULT FALSE,
    published BOOLEAN DEFAULT TRUE,
    view_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- TECHNIQUE SEED DATA
-- ============================================================================

INSERT INTO techniques (
    slug, name, japanese_name, japanese_characters, category, subcategory,
    summary, description, history_and_origin, philosophy,
    difficulty_level, difficulty_description, time_required, time_per_tree,
    primary_season, timing_details, seasonal_calendar,
    preparation_steps, technique_steps, finishing_steps, aftercare,
    tools_required, optional_tools, materials_needed,
    applicable_species, species_variations, best_for, not_suitable_for,
    pro_tips, common_mistakes, warning_signs, recovery_advice,
    video_url, diagram_description, before_after_description,
    related_techniques, prerequisite_techniques, regional_variations,
    featured, published
) VALUES

-- ============================================================================
-- 1. MIDORITSUMI (CANDLE PRUNING)
-- ============================================================================
(
    'midoritsumi-candle-pruning',
    'Candle Pruning (Midoritsumi)',
    'Midoritsumi',
    '緑摘み',
    'pine',
    'spring-pruning',
    'The essential spring technique of pinching or removing soft new growth (candles) from pine trees to control growth, maintain shape, and promote compact foliage development.',
    E'Midoritsumi, literally meaning "green picking," is the cornerstone of Japanese pine maintenance. This technique involves the selective removal or shortening of the soft, elongated new growth that appears on pines each spring—called "candles" because of their shape and waxy appearance.

The purpose of midoritsumi is threefold: to control the overall size and shape of the tree, to redirect energy to weaker areas for balanced growth, and to promote the development of secondary buds that create the dense, compact foliage pads characteristic of well-maintained niwaki pines.

Unlike Western approaches that often involve cutting hardened growth, midoritsumi targets the candles while they are still soft and pliable—typically when they have extended but before the needles have fully unfurled. This timing is critical: too early and the tree has not committed enough energy to the growth; too late and the candles become woody, requiring shears and risking damage to emerging needles.

The technique requires the gardener to visualise how the tree will look once the remaining needles have fully opened and reached their final length. This imaginative projection, combined with knowledge of how different pine species respond to the treatment, makes midoritsumi one of the most challenging techniques to master—yet one of the most rewarding.

In professional Japanese gardens, midoritsumi is considered the most important task of the year, and the busiest time for gardeners. A single mature pine may have hundreds of candles requiring individual attention, making this a meditative, time-intensive practice.',
    E'Candle pruning has been practised in Japan for centuries, developing alongside the formal traditions of Japanese garden design during the Edo period (1603-1868). The technique evolved in the tree nurseries of Osaka and Kyoto, where gardeners developed sophisticated methods for producing and maintaining niwaki for temple gardens and the estates of the nobility.

The term "midoritsumi" comes from "midori" (green) and "tsumu" (to pick or pluck), reflecting the traditional method of removing candles by hand rather than with tools.',
    E'Midoritsumi embodies the Japanese principle of working with nature rather than against it. By intervening at precisely the right moment in the tree''s natural growth cycle, the gardener redirects the tree''s energy without causing stress. The technique reflects the understanding that patience and timing are more powerful than force—a single well-timed pinch achieves what heavy cutting cannot.

The practice also demonstrates the Japanese aesthetic of restraint: rather than allowing the tree to express its full vigour, the gardener gently contains and refines that energy into a more concentrated form.',
    7,
    'Intermediate to Advanced',
    '2-4 weeks for all pines in a garden',
    '30 minutes to 2 hours per tree depending on size',
    'Late Spring',
    '{
        "northern_hemisphere": {
            "optimal_window": "Mid-May to early June",
            "uk": "Mid-May to early June",
            "usa_northeast": "Late May to mid-June",
            "usa_pacific_northwest": "Mid-May to early June",
            "japan_tokyo": "Early to mid-May",
            "japan_kyoto": "Early May"
        },
        "southern_hemisphere": {
            "optimal_window": "Mid-November to early December",
            "australia_melbourne": "Mid-November to early December",
            "new_zealand": "Mid-November to early December"
        }
    }',
    '{
        "march": "Observe bud development, prepare tools",
        "april": "Watch for candle emergence, begin on earliest specimens",
        "may": "Primary midoritsumi period in UK/Europe",
        "june": "Complete remaining trees, early candles producing second flush",
        "july": "Optional megiri (second candle removal) on vigorous trees"
    }',
    '[
        {"step": 1, "title": "Assess the tree", "description": "Stand back and observe the overall shape. Identify areas of strong growth (usually the apex and outer tips) versus weaker areas (lower and inner branches). Strong areas will need more candles removed; weak areas may be left alone."},
        {"step": 2, "title": "Check candle readiness", "description": "Candles are ready when they have extended to 5-15cm but needles have not yet opened. The candle should be soft enough to snap cleanly between thumb and forefinger. If it bends rather than snaps, it is too early; if you need shears, it is too late."},
        {"step": 3, "title": "Clean and prepare tools", "description": "While traditionally done entirely by hand, have sharp snips ready for any candles that have hardened. Clean tools with alcohol to prevent disease spread. Wear old clothes—pine resin (matsuyani) stains permanently."},
        {"step": 4, "title": "Plan your approach", "description": "Work from the top of the tree downward, and from the outside in. This ensures you process stronger growth first and can assess the impact as you work down to weaker areas."}
    ]',
    '[
        {"step": 1, "title": "Locate candle clusters", "description": "Find the clusters of candles at branch tips. Typically there will be one dominant central candle surrounded by 2-5 smaller secondary candles."},
        {"step": 2, "title": "Remove the dominant candle", "description": "The central candle is usually the strongest and longest. Remove it entirely by snapping it off at the base. This redirects energy to the secondary candles."},
        {"step": 3, "title": "Reduce to two candles", "description": "From the remaining candles, select two that point in useful directions (ideally creating a Y-shape). Remove any others. The goal is to maintain the branching structure."},
        {"step": 4, "title": "Shorten remaining candles", "description": "If the two remaining candles are of unequal size, shorten the stronger one by 30-70% to balance energy. Snap or pinch—never cut with scissors if avoidable, as this damages needle tips."},
        {"step": 5, "title": "Adjust for tree zones", "description": "In the apex and strong outer areas, remove more candle length (up to 70%). In weak lower branches, remove less or leave candles untouched to allow them to strengthen."},
        {"step": 6, "title": "Work systematically", "description": "Process each branch tip before moving to the next. Work around the tree to maintain perspective on overall balance."},
        {"step": 7, "title": "Step back frequently", "description": "Every 15-20 minutes, step back several metres to assess the overall effect. Adjust your approach if one area is becoming too sparse or too dense."}
    ]',
    '[
        {"step": 1, "title": "Clear debris", "description": "Remove any fallen candles from within the tree and from the ground below. Leaving debris can harbour pests."},
        {"step": 2, "title": "Final assessment", "description": "Walk around the tree from multiple angles. The branch structure should be clearly visible, with even spacing between foliage masses."},
        {"step": 3, "title": "Clean your hands", "description": "Pine resin is extremely sticky. Olive oil or specialist resin removers work better than soap alone."}
    ]',
    E'After midoritsumi, the tree will produce a second flush of growth over the following 4-6 weeks. These secondary candles will be shorter and more compact than the originals would have been. Keep the tree well-watered during this period, as it is expending energy to regenerate.

Do not fertilise immediately after midoritsumi—wait 2-3 weeks to avoid stimulating excessive regrowth that defeats the purpose of the technique.

Mark your calendar for momiage (autumn needle-plucking) in October-November, which is the companion technique that completes the annual pine maintenance cycle.',
    '[
        {"name": "Hands (primary tool)", "description": "Traditional midoritsumi uses only fingers to snap soft candles", "price_range": "Free"},
        {"name": "Niwaki snips or bonsai scissors", "description": "For any candles that have hardened beyond pinching stage", "price_range": "£25-60"},
        {"name": "Arm covers", "description": "Protect clothing from pine resin", "price_range": "£15-25"}
    ]',
    '[
        {"name": "Tripod ladder", "description": "Essential for working on larger trees safely", "price_range": "£200-600"},
        {"name": "Secateurs", "description": "For removing any unwanted small branches discovered during work", "price_range": "£40-120"}
    ]',
    '[
        {"name": "Cleaning alcohol", "description": "For tool sterilisation between trees"},
        {"name": "Old clothes", "description": "Pine resin stains are permanent"},
        {"name": "Resin remover or olive oil", "description": "For cleaning hands after work"}
    ]',
    '["pinus-thunbergii", "pinus-densiflora", "pinus-parviflora", "pinus-nigra", "pinus-sylvestris", "pinus-mugo"]',
    '{
        "pinus-thunbergii": {
            "name": "Japanese Black Pine (Kuromatsu)",
            "notes": "Most vigorous species. Pinch candles right to the base. Can tolerate aggressive treatment.",
            "timing": "Earlier in the season"
        },
        "pinus-densiflora": {
            "name": "Japanese Red Pine (Akamatsu)",
            "notes": "Slightly slower growing. Leave 1-2.5cm of candle base for quicker regeneration.",
            "timing": "Standard timing"
        },
        "pinus-parviflora": {
            "name": "Japanese White Pine (Goyomatsu)",
            "notes": "Slowest growing of Japanese pines. Be more conservative—remove less candle length in weak areas.",
            "timing": "Later in the season"
        },
        "pinus-sylvestris": {
            "name": "Scots Pine",
            "notes": "Responds well but slower to regenerate than Japanese species. Slightly gentler treatment recommended.",
            "timing": "Standard timing for UK"
        },
        "pinus-nigra": {
            "name": "Austrian Black Pine",
            "notes": "Vigorous like Japanese Black Pine. Can be treated similarly.",
            "timing": "Standard timing"
        }
    }',
    'Maintaining shape and promoting dense, compact growth on established niwaki pines. Essential for any cloud-pruned pine.',
    'Young pines still in training (allow them to grow out first). Weak or stressed trees. Any pine that has not been watered adequately.',
    '[
        "Timing is everything—work on candles when they snap cleanly. Check daily once they start extending.",
        "Your hands will get filthy with sticky resin. Accept this and plan for cleanup time.",
        "On larger gardens with many pines, work in stages over 2-3 weeks, starting with the most vigorous specimens.",
        "In Japan, professional gardeners say the tree should look ''over-plucked'' immediately after midoritsumi. It will fill out over summer.",
        "Never do midoritsumi in wet weather—moisture on candles increases disease risk.",
        "If you miss the window and candles have hardened, you can still prune with snips, but expect some brown needle tips.",
        "Keep detailed notes of when each tree is ready. Individual trees in the same garden may vary by 1-2 weeks."
    ]',
    '[
        {"mistake": "Working too late", "consequence": "Candles have hardened and require cutting, damaging needle tips and leaving brown marks", "prevention": "Check trees daily once candles start extending. Work within the 2-3 week optimal window."},
        {"mistake": "Treating all areas equally", "consequence": "Weak branches become weaker, strong branches dominate further", "prevention": "Always assess the tree first. Remove more from strong areas, less from weak areas."},
        {"mistake": "Removing all candles", "consequence": "No new growth, potential branch dieback", "prevention": "Always leave at least 1-2 candles per branch tip."},
        {"mistake": "Pinching too early", "consequence": "Tree produces replacement candles, doubling your work", "prevention": "Wait until candles have extended and committed energy."},
        {"mistake": "Using scissors when fingers would do", "consequence": "Cut needle tips turn brown, spoiling appearance", "prevention": "Only use tools on candles too hard to snap cleanly."},
        {"mistake": "Forgetting to step back", "consequence": "Unbalanced result not apparent until finished", "prevention": "Step back every 15-20 minutes to assess from a distance."}
    ]',
    'If needles turn brown at tips after cutting, this is cosmetic only and will be hidden by subsequent growth. If entire candle areas fail to regenerate, the tree may be stressed—check watering and consider whether the tree was overworked.',
    'Branches that produce no new growth after midoritsumi may have been cut too hard. Allow them to rest without further intervention for a full year before assessing.',
    NULL,
    'The before and after difference should be dramatic: before, the tree has long, extending candles creating an uneven outline; after, the candles are shortened to stubs, with the underlying branch structure clearly visible.',
    E'Before midoritsumi, the pine appears fluffy and irregular, with long candles extending in all directions. After, the tree looks temporarily sparse, with short candle stubs and the elegant branch architecture revealed. Over the following months, the secondary growth fills in, creating the dense, compact foliage pads characteristic of a well-maintained niwaki pine.',
    '["momiage-needle-plucking", "sukashi-thinning", "megiri-second-flush"]',
    '[]',
    '{
        "kanto_japan": {
            "name": "Kanto Region (Tokyo area)",
            "timing": "Early to mid-May",
            "notes": "Standard technique as described"
        },
        "kyoto_japan": {
            "name": "Kyoto/Kansai Region",
            "timing": "Early May (slightly earlier due to warmer spring)",
            "notes": "May leave slightly more needles on Akamatsu due to summer heat stress"
        },
        "hokkaido_japan": {
            "name": "Hokkaido (Northern Japan)",
            "timing": "Late May to early June",
            "notes": "All work carried out slightly later. More conservative approach due to shorter growing season."
        },
        "uk": {
            "name": "United Kingdom",
            "timing": "Mid-May to early June",
            "notes": "Timing similar to Kanto. Scots pine responds well alongside Japanese species."
        }
    }',
    TRUE,
    TRUE
),

-- ============================================================================
-- 2. MOMIAGE (NEEDLE PLUCKING)
-- ============================================================================
(
    'momiage-needle-plucking',
    'Needle Plucking (Momiage)',
    'Momiage',
    '揉み上げ',
    'pine',
    'autumn-pruning',
    'The essential autumn technique of removing old pine needles by hand to improve light penetration, reveal branch structure, and prepare the tree for winter.',
    E'Momiage, curiously translating as "sideburns," is the autumn companion to spring''s midoritsumi. While midoritsumi controls new growth, momiage refines the existing foliage by removing old needles—typically two and three-year-old growth—leaving only the fresh needles from the current season.

This technique serves multiple purposes: it allows light to penetrate to the inner branches (preventing their decline), improves air circulation (reducing disease pressure), reveals the elegant branch structure of the tree, and gives the pine the clean, refined appearance prized in Japanese gardens.

The work is traditionally done entirely by hand, using a plucking motion that gives the technique its name. Gardeners grasp clusters of old needles between thumb and forefinger and pull them away from the branch with a gentle but firm motion. This can be hard on the hands—pine needles are sharp—but the tactile connection provides important feedback about the health of each branch.

In Japan, momiage is often performed in November and December, timed to complete before New Year celebrations. Gardens are meticulously groomed as part of welcoming the new year in a proper and well-ordered state. Multiple gardeners may work on a single large pine, and in temple gardens, five or six people working together on one tree is not unusual.

The amount of foliage removed depends on the tree''s strength and the gardener''s goals. A standard approach leaves 7-8 pairs of needles on each shoot in strong areas, and 10-12 pairs in weaker areas. This differential treatment helps balance the tree''s energy distribution.',
    E'Momiage has been practised in Japanese gardens for centuries, with regional variations developing across different areas of Japan. The technique is also known as "ha mushiri" (葉むしり, meaning "leaf plucking") in Kyoto, reflecting the slightly different traditions that evolved in different cultural centres.

The timing of momiage—late autumn to early winter—connects it to the Japanese tradition of preparing gardens for the New Year. Completing the pine grooming before the holiday represents a fresh start and demonstrates respect for the garden and its visitors.',
    E'Momiage embodies the principle of revealing essential beauty through careful removal. Rather than adding, the gardener subtracts—taking away old, faded growth to reveal the fresh vitality beneath. This aligns with the Japanese aesthetic of "less is more" and the idea that true beauty lies in what remains after non-essential elements are removed.

The work also teaches patience and presence. Each needle cluster must be individually assessed and handled, demanding complete attention. The slow, meditative rhythm of the work is considered as important as the result.',
    5,
    'Intermediate',
    '1-3 weeks for all pines in a garden',
    '1-4 hours per tree depending on size',
    'Late Autumn/Early Winter',
    '{
        "northern_hemisphere": {
            "optimal_window": "October to December",
            "uk": "October to November",
            "usa_northeast": "October to November",
            "japan_tokyo": "November to December",
            "japan_kyoto": "November (may leave more needles due to harsher winters)"
        },
        "southern_hemisphere": {
            "optimal_window": "May to June",
            "australia_melbourne": "May to June",
            "new_zealand": "May to June"
        }
    }',
    '{
        "september": "Assess tree condition, identify weak branches that may need lighter treatment",
        "october": "Begin momiage on strongest trees in UK/Northern Europe",
        "november": "Primary momiage period. Brown needles are clearly visible and easy to remove.",
        "december": "Complete remaining trees before hard frosts in cold climates"
    }',
    '[
        {"step": 1, "title": "Assess tree health", "description": "Walk around the tree and identify zones of strength and weakness. Strong areas (apex, outer branches) will have more needles removed. Weak areas (lower, inner branches) should be treated more gently."},
        {"step": 2, "title": "Check weather forecast", "description": "Avoid working in wet conditions, which increase disease risk. Mild, dry days are ideal."},
        {"step": 3, "title": "Prepare your hands", "description": "Some gardeners wear thin gloves, but most prefer bare hands for the tactile feedback. Consider surgical tape on fingertips if working for extended periods."},
        {"step": 4, "title": "Set up access", "description": "Position tripod ladder safely. For large trees, work in sections over multiple sessions rather than rushing."}
    ]',
    '[
        {"step": 1, "title": "Start from the top", "description": "Begin at the apex of the tree and work downward. The top should be thinned more than the bottom to allow light to reach lower branches."},
        {"step": 2, "title": "Identify needle ages", "description": "Current season needles are bright green and fresh. One-year-old needles are darker green. Two and three-year-old needles are dull, often yellowing. Remove the older growth."},
        {"step": 3, "title": "Grasp and pull", "description": "Hold a cluster of old needles between thumb and forefinger. Pull firmly in the direction of needle growth. They should release cleanly. If they resist, try a different angle—never tear or twist violently."},
        {"step": 4, "title": "Leave correct amount", "description": "Standard approach: leave 7-8 pairs of fresh needles on shoots in strong areas, 10-12 pairs in weak areas. Kyoto tradition may leave up to 15 pairs."},
        {"step": 5, "title": "Thin buds simultaneously", "description": "While plucking needles, assess the buds forming for next year. If there are more than 2-3 buds at a shoot tip, remove the central/dominant one to leave a balanced pair."},
        {"step": 6, "title": "Check branch by branch", "description": "Work systematically across each branch, then move to the next. Complete one section before moving on."},
        {"step": 7, "title": "Reveal branch structure", "description": "When complete, the branch skeleton should be clearly visible, with tidy tufts of fresh needles at the shoot tips."}
    ]',
    '[
        {"step": 1, "title": "Clear fallen needles", "description": "Shake the tree gently or use a bamboo broom to dislodge any needles caught in the branch structure. Remove all debris from within the tree and from the ground."},
        {"step": 2, "title": "Final assessment", "description": "Step back and view from multiple angles. The tree should appear light and airy, with clear separation between foliage masses. The branch structure should be visible."},
        {"step": 3, "title": "Record notes", "description": "Note any branches that seem weak or concerning for follow-up in spring."}
    ]',
    E'The tree may look sparse immediately after momiage—this is normal and intended. Through winter, the clean appearance is particularly striking against snow or frost.

Do not fertilise after momiage. The tree is entering dormancy and should not be stimulated into new growth.

Watch for any die-back over winter, which may indicate branches that were over-thinned. Note these areas for lighter treatment next year.

The tree is now ready for winter. In heavy snowfall areas, consider yukitsuri (snow protection) if appropriate.',
    '[
        {"name": "Hands (primary tool)", "description": "Momiage is traditionally done entirely by hand", "price_range": "Free"},
        {"name": "Niwaki snips", "description": "For removing any small unwanted branches discovered during work", "price_range": "£25-60"},
        {"name": "Tripod ladder", "description": "Essential for reaching upper parts of larger trees", "price_range": "£200-600"}
    ]',
    '[
        {"name": "Bamboo whisk broom", "description": "For clearing fallen needles from the tree", "price_range": "£15-30"},
        {"name": "Arm covers", "description": "Protect arms from needle scratches and resin", "price_range": "£15-25"}
    ]',
    '[
        {"name": "Surgical tape", "description": "For protecting fingertips during extended sessions"},
        {"name": "Drop cloth", "description": "For easy cleanup of fallen needles"}
    ]',
    '["pinus-thunbergii", "pinus-densiflora", "pinus-parviflora", "pinus-nigra", "pinus-sylvestris", "pinus-mugo"]',
    '{
        "pinus-thunbergii": {
            "name": "Japanese Black Pine (Kuromatsu)",
            "notes": "Remove both two and three-year-old needles in standard treatment",
            "needle_retention": "7-8 pairs in strong areas"
        },
        "pinus-densiflora": {
            "name": "Japanese Red Pine (Akamatsu)",
            "notes": "In colder areas (Hokkaido), only remove two-year-old needles, keeping last year''s for winter protection",
            "needle_retention": "8-10 pairs, slightly more conservative"
        },
        "pinus-parviflora": {
            "name": "Japanese White Pine",
            "notes": "Needles persist longer on this species. Be very conservative—remove only the oldest, clearly faded needles.",
            "needle_retention": "10-12 pairs"
        },
        "pinus-sylvestris": {
            "name": "Scots Pine",
            "notes": "Responds well to momiage. Needles typically last 2-3 years. Standard treatment works well.",
            "needle_retention": "8-10 pairs"
        }
    }',
    'Annual maintenance of established niwaki pines. Revealing branch structure. Preparing trees for winter. Balancing energy between strong and weak areas.',
    'Young pines still in development. Weak or stressed trees. Trees that did not receive midoritsumi (the techniques work together).',
    '[
        "Jake Hobson says momiage gives your hands ''the workout of their lives.'' Build up stamina over multiple sessions.",
        "In Japanese temple gardens, momiage is a social activity—several gardeners working on one tree, discussing and comparing approaches.",
        "Kyoto gardeners traditionally leave more needles (up to 15 pairs) to protect against the region''s harsh winters and hot summers.",
        "The tree should look ''over-thinned'' immediately after momiage. This is correct—it will fill out next spring.",
        "If you pull a whole shoot tip off accidentally (it happens), don''t panic. The branch will produce new buds from dormant points.",
        "Brown needles at the interior are your friends—they come away easily and reveal the branch structure beneath.",
        "Work on dry days. Moisture on needles increases friction and makes removal harder."
    ]',
    '[
        {"mistake": "Removing too many needles from weak branches", "consequence": "Branch fails to regenerate and dies back over winter", "prevention": "Assess tree zones first. Leave 10-12 pairs on weak branches versus 7-8 on strong ones."},
        {"mistake": "Tearing rather than pulling", "consequence": "Bark damage where needles attach, potential disease entry points", "prevention": "Pull firmly in the direction of needle growth. If a cluster resists, try from a different angle."},
        {"mistake": "Working in wet weather", "consequence": "Increased disease risk, needles harder to remove cleanly", "prevention": "Choose dry days for momiage work."},
        {"mistake": "Not removing buds simultaneously", "consequence": "Too many buds left, creating excessive candles next spring", "prevention": "While plucking needles, thin buds to leave 2-3 per shoot tip."},
        {"mistake": "Inconsistent treatment across the tree", "consequence": "Patchy appearance, energy imbalance", "prevention": "Work systematically, completing each section before moving on."}
    ]',
    'Branches that feel brittle or snap easily during work may be dying and should be noted for possible removal. Needles that are slimy or smell unpleasant may indicate disease.',
    'If a branch dies back after momiage, it was likely either too weak to begin with or over-thinned. Leave it until spring to confirm death before removing. Living branches may regenerate from dormant buds.',
    NULL,
    'Imagine the branch as a hand with fingers spread: needles radiate outward from shoot tips. After momiage, each ''finger'' has a tuft of fresh needles at its tip, with the ''hand'' (branch structure) clearly visible between them.',
    'Before: Dense, fuzzy appearance with old brown needles mixed with green, branch structure obscured. After: Clean, airy appearance with distinct tufts of fresh needles, elegant branch architecture revealed, light penetrating to interior.',
    '["midoritsumi-candle-pruning", "sukashi-thinning", "megiri-second-flush"]',
    '["midoritsumi-candle-pruning"]',
    '{
        "kanto_japan": {
            "name": "Kanto Region (Tokyo area)",
            "timing": "November to early January",
            "notes": "Standard treatment as described"
        },
        "kyoto_japan": {
            "name": "Kyoto/Kansai Region",
            "timing": "November",
            "notes": "Leave up to 15 pairs of needles due to harsher climate extremes"
        },
        "hokkaido_japan": {
            "name": "Hokkaido (Northern Japan)",
            "timing": "October to November (earlier due to cold)",
            "notes": "Remove only two-year-old needles, keeping last year''s growth for winter protection"
        },
        "uk": {
            "name": "United Kingdom",
            "timing": "October to November",
            "notes": "Complete before hard frosts. Standard treatment works well."
        }
    }',
    TRUE,
    TRUE
),

-- ============================================================================
-- 3. KARIKOMI (HEDGE SHEARING)
-- ============================================================================
(
    'karikomi-hedge-shearing',
    'Karikomi (Hedge Shearing)',
    'Karikomi',
    '刈り込み',
    'broadleaf',
    'shearing',
    'The Japanese technique of shearing evergreen shrubs into soft, rounded forms that contrast with and complement the surrounding garden landscape.',
    E'Karikomi, meaning "sheared back," refers to the practice of regularly clipping evergreen shrubs into rounded, organic forms. Unlike Western geometric topiary, karikomi shapes are never perfect spheres or cubes—they are soft, undulating forms that suggest natural contours like hills, clouds, or waves.

The prefix "O" gives us "o-karikomi," referring to massed plantings of sheared shrubs that flow together as continuous sculptural compositions. These rolling forms are among the most distinctive features of Japanese gardens, creating a sense of geological timelessness—as if the shrubs were buried boulders or rising hillsides.

Individual sheared shrubs are called "tamamono" (ball-shaped things), though again, the shape is never a perfect sphere. Tamamono are typically wider than tall, appearing to sit heavily on the ground like rounded stones partially buried in the earth.

The technique dates to the mid-16th century, though the aesthetic is likely much older. Some of Japan''s most famous gardens feature spectacular karikomi—the rolling azalea waves at Raikyū-ji Temple and the massed plantings at Tōfuku-ji are legendary examples.

Karikomi requires specific tools: curved hedge shears (karikomi basami) that follow the organic contours of the shrubs. The curved blade faces upward during cutting, giving the gardener control over the depth of cut and preventing accidental gouging.',
    E'The term karikomi dates to the mid-16th century, emerging during the Momoyama period when it began to be used as a distinct design element separate from the stones it often accompanied. By the Edo period, karikomi had become a signature feature of Japanese garden design, with famous examples at major temple gardens throughout Kyoto.

The technique developed in contrast to the geometric topiary traditions of Europe—Japanese gardeners sought to create forms that appeared natural and timeless, as if shaped by wind and weather rather than human intervention.',
    E'Karikomi embodies the Japanese concept of controlled naturalness. The forms appear organic and inevitable, yet require constant human intervention to maintain. This paradox—natural appearance achieved through careful artifice—lies at the heart of Japanese garden philosophy.

The rounded shapes are never arbitrary. They relate to other elements in the garden, creating visual harmony through repetition and variation of form. A karikomi may echo the shape of a nearby boulder, or a series of tamamono may descend like stepping stones across a hillside.',
    4,
    'Intermediate',
    '1-2 days per garden section',
    '20-60 minutes per shrub depending on size',
    'Early Summer',
    '{
        "northern_hemisphere": {
            "optimal_window": "Late May to early July",
            "uk": "June to July, after any spring flowers have faded",
            "japan_tokyo": "Late June to early July"
        },
        "southern_hemisphere": {
            "optimal_window": "November to January",
            "australia_melbourne": "December to January"
        }
    }',
    '{
        "april": "Assess growth, identify any sections needing attention before main shearing",
        "may": "Early shearing possible if growth is vigorous",
        "june": "Primary karikomi period in UK—flowers have faded, new growth is soft",
        "july": "Complete shearing. Subsequent light trimming may be needed later in season",
        "august": "Light trim to maintain shape if needed",
        "september": "Final light trim before dormancy in warmer climates"
    }',
    '[
        {"step": 1, "title": "Assess the overall composition", "description": "Stand back and view the karikomi in context with surrounding garden elements. Consider how the forms relate to stones, trees, and other shrubs."},
        {"step": 2, "title": "Clear debris from interior", "description": "Remove any dead leaves, twigs, or accumulated debris from within and around the shrubs before shearing."},
        {"step": 3, "title": "Check tool sharpness", "description": "Karikomi shears must be extremely sharp for clean cuts. Dull blades tear rather than cut, leaving brown edges."},
        {"step": 4, "title": "Plan your approach", "description": "Decide on the ideal finished shape before making any cuts. Consider the shrub''s natural growth pattern and work with it, not against it."}
    ]',
    '[
        {"step": 1, "title": "Position the shears correctly", "description": "Hold curved karikomi shears with the curve facing upward (counterintuitive, but this prevents accidental gouging). Hold one handle firm and move only the other to maintain control."},
        {"step": 2, "title": "Start at a reference point", "description": "Begin not at the top, but slightly below it. Cut a small rainbow-shaped arc to establish your reference depth."},
        {"step": 3, "title": "Work in sections", "description": "From your reference point, work outward: top, sides, back, and finally bottom. Complete each section before moving on."},
        {"step": 4, "title": "Follow the curve", "description": "Move the shears in smooth, continuous arcs that follow the intended shape. The motion should be flowing, not jabbing."},
        {"step": 5, "title": "Maintain even pressure", "description": "Consistent pressure creates an even surface. Light pressure creates a smooth finish; avoid pushing too hard."},
        {"step": 6, "title": "Step back frequently", "description": "Every few minutes, step back 2-3 metres to assess the overall shape. Adjust as needed."},
        {"step": 7, "title": "Address the lower edges", "description": "Tamamono should appear to ''sit'' on the ground. The lower edge should curve gently to meet the soil—never curl inward or hover above the ground."}
    ]',
    '[
        {"step": 1, "title": "Brush away cuttings", "description": "Use a bamboo broom (tebo) to pat the shrub firmly, dislodging any cut material caught in the foliage."},
        {"step": 2, "title": "Snip stragglers", "description": "Use hand shears to cut any individual stems that stick out from the smooth surface."},
        {"step": 3, "title": "Final inspection", "description": "Walk around the shrub from multiple angles. The shape should appear smooth, balanced, and natural—wider at the base than the top, sitting firmly on the ground."}
    ]',
    E'Light trim as needed through the growing season to maintain the smooth form. In climates with long growing seasons, a second and even third light trim may be necessary.

Avoid shearing during drought stress or in very hot weather—the exposed cut surfaces can scorch.

In winter, the clean forms of karikomi become particularly striking against bare deciduous plants or snow. No winter pruning is needed; the shape will hold until spring.',
    '[
        {"name": "Karikomi shears (curved)", "description": "Traditional Japanese hedge shears with curved blades for organic shapes", "price_range": "£100-200"},
        {"name": "Bamboo whisk broom (tebo)", "description": "For patting the shrub to dislodge cuttings", "price_range": "£15-30"}
    ]',
    '[
        {"name": "Hand shears/secateurs", "description": "For detailed finishing and removing individual protruding stems", "price_range": "£40-80"},
        {"name": "Power hedge trimmer", "description": "Called barikan in Japanese—for large areas when time is limited, though hand shears give superior results", "price_range": "£150-400"}
    ]',
    '[
        {"name": "Drop cloth", "description": "For easy collection of clippings"}
    ]',
    '["rhododendron", "azalea-satsuki", "ilex-crenata", "buxus-sempervirens", "buxus-microphylla", "taxus-cuspidata", "osmanthus-burkwoodii", "camellia-japonica"]',
    '{
        "azalea": {
            "name": "Azalea (especially Satsuki types)",
            "notes": "The classic karikomi plant. Wait until after flowering before shearing—usually late June in UK.",
            "special_care": "Can be sheared closely; regenerates well from old wood"
        },
        "ilex-crenata": {
            "name": "Japanese Holly",
            "notes": "Excellent for karikomi. Stiffer branching habit than azalea but responds well to shearing.",
            "special_care": "Avoid shearing in hot, dry weather"
        },
        "buxus": {
            "name": "Box/Boxwood",
            "notes": "Traditional Western equivalent to Japanese shrubs. Works well for karikomi forms.",
            "special_care": "Be aware of box blight risk in humid conditions"
        },
        "taxus": {
            "name": "Yew",
            "notes": "Tolerates shearing well and regenerates from old wood. Good for larger karikomi.",
            "special_care": "Avoid cutting into old brown wood—it regenerates slowly"
        }
    }',
    'Creating soft, rounded forms in Japanese-style gardens. Massed shrub plantings. Individual tamamono specimens as focal points or rhythm elements.',
    'Shrubs that do not respond well to shearing (most pines, for example—use midoritsumi instead). Plants that are too small to create the required form. Young plants still establishing.',
    '[
        "The shape should be at least twice as wide as tall—never a perfect ball.",
        "Tamamono should appear to ''sink into'' the ground. Train the lower edge to meet the soil without any gap or inward curl.",
        "On larger shrubs, consider using hand snips (one twig at a time) rather than shears for superior results. This is time-intensive but creates a healthier, longer-lived plant.",
        "Japanese gardeners say: shearing creates a dense shell that shades out the interior. Periodically open small holes in the surface to let light in and prevent hollow centers.",
        "Work in the early morning or on cloudy days—exposed cut surfaces can scorch in hot sun.",
        "The curved blade faces upward. This is counterintuitive but essential for control."
    ]',
    '[
        {"mistake": "Creating perfect geometric shapes", "consequence": "Result looks Western and artificial, not Japanese", "prevention": "Aim for soft, organic forms that appear natural. Vary height and width slightly."},
        {"mistake": "Cutting too deeply", "consequence": "Brown patches where foliage has been cut back to bare wood", "prevention": "Never cut more than the current season''s growth. If in doubt, cut less."},
        {"mistake": "Shearing during drought or heat", "consequence": "Scorched, brown cut surfaces that spoil the appearance", "prevention": "Shear on cloudy days or early morning. Ensure shrubs are well-watered."},
        {"mistake": "Leaving lower edge hovering above ground", "consequence": "Shrub appears unanchored and unstable", "prevention": "Train lower edges to curve gently down to meet the soil surface."},
        {"mistake": "Creating a dense outer shell", "consequence": "Interior becomes hollow; whole branch sections die", "prevention": "Periodically thin small openings in the surface to admit light to the interior."}
    ]',
    'Brown patches appearing after shearing indicate either cutting too deep (into old wood without leaves) or heat/drought stress. Yellowing interior foliage suggests the outer shell is too dense and blocking light.',
    'Brown patches from over-cutting may take 1-2 years to fill in. Keep the plant healthy with adequate water and light feeding. Do not cut the brown area further—wait for new growth to emerge and gradually cover it.',
    NULL,
    'Imagine a smooth boulder partially buried in the earth—rounded top, sides curving down to meet the ground, wider at base than top. This is the ideal tamamono form.',
    'Before: Uneven, shaggy growth with shoots extending in all directions. After: Smooth, rounded form with dense, even surface; clean silhouette that appears natural and timeless.',
    '["tamamono-mounded-forms", "o-karikomi-wave-forms"]',
    '[]',
    '{
        "japan": {
            "name": "Japan (general)",
            "notes": "Primary shearing in late June/early July after flowers have faded"
        },
        "uk": {
            "name": "United Kingdom",
            "notes": "June to July works well. May need second light trim in August."
        }
    }',
    TRUE,
    TRUE
),

-- ============================================================================
-- 4. SUKASHI (THINNING)
-- ============================================================================
(
    'sukashi-thinning',
    'Sukashi (Thinning)',
    'Sukashi',
    '透かし',
    'pine',
    'structural-pruning',
    'The technique of thinning the canopy to allow light and air to penetrate, revealing branch structure and promoting the health of inner and lower branches.',
    E'Sukashi, meaning "to let light shine through" or "transparency," is the art of thinning the pine canopy to achieve several important goals: allowing light to reach inner and lower branches, improving air circulation to reduce disease pressure, revealing the elegant bone structure of the tree, and creating the sense of age and refinement prized in Japanese garden aesthetics.

Unlike the regular maintenance of midoritsumi and momiage, sukashi is often performed when a tree has been neglected for several years, has grown too dense, or needs to be reduced in size. It may also be called "o-sukashi" (great thinning) when major reduction is required.

The work involves removing entire shoots and small branches from within the foliage masses, thinning the density so that the remaining growth is more clearly defined. When looking at a completed sukashi, you should be able to see through the tree—the Japanese say that "a bird should be able to fly through without touching its feathers."

Sukashi requires careful judgement about which growth to remove. A key rule: when cutting a pine, never cut beyond the oldest small shoot on a branch. If you cut further back than this point, the branch will die the following year even if needles remain beyond the cut. This is because pine regeneration occurs only from existing green growth—unlike broadleaf plants, pines cannot regenerate from bare wood.

The technique is typically performed in autumn or early winter, often combined with momiage. However, major structural sukashi may be spread across multiple years to avoid shocking the tree.',
    E'Sukashi developed alongside other Japanese pine pruning techniques as part of the comprehensive system for maintaining niwaki in temple and estate gardens. The emphasis on light and air penetration reflects both practical horticultural knowledge and aesthetic principles—the refined, transparent appearance of a well-thinned pine embodies concepts central to Japanese art and spirituality.

Different regional traditions exist within Japan. "Gosho-sukashi" is the distinctive style used in Kyoto Imperial Palace, emphasising natural appearance and using traditional tools including the nagae-kama (sickle on a long pole). "Tera-sukashi" and "Machiya-sukashi" are other regional variations.',
    E'The name sukashi literally means "transparency" or "seeing through." This captures both the practical and philosophical dimensions of the technique. On a practical level, light must penetrate the canopy or inner branches will weaken and die. On an aesthetic level, the ability to see through the tree reveals its essential structure—the bones beneath the flesh.

Japanese gardens prize the sense of age and endurance that trees convey. A dense, solid canopy looks heavy and immature. A transparent canopy, with clearly visible branches and separated foliage masses, suggests a tree that has weathered centuries of wind and weather. Sukashi accelerates this appearance of age.',
    7,
    'Advanced',
    '3-6 hours per tree',
    'Major sukashi may be spread across 2-3 years',
    'Autumn to Early Winter',
    '{
        "northern_hemisphere": {
            "optimal_window": "October to December",
            "uk": "October to November",
            "japan_tokyo": "November to December"
        },
        "southern_hemisphere": {
            "optimal_window": "May to July",
            "australia_melbourne": "May to June",
            "new_zealand": "May to June"
        }
    }',
    '{
        "september": "Assess which trees need sukashi; plan scope of work",
        "october": "Begin sukashi on trees needing major work in UK",
        "november": "Primary sukashi period; combine with momiage",
        "december": "Complete sukashi before hard frosts"
    }',
    '[
        {"step": 1, "title": "Assess the tree thoroughly", "description": "Walk around the tree from multiple angles. Identify areas of excessive density, crossing branches, dead wood, and any structural problems. Consider how much to remove—major sukashi should be spread across multiple years."},
        {"step": 2, "title": "Identify the oldest growth", "description": "On each branch, locate the oldest small shoot. This is your ''point of no return''—never cut beyond it, or the branch will die."},
        {"step": 3, "title": "Prepare tools", "description": "Sharp secateurs for small branches, pruning saw for larger cuts. Sukashi cannot be done by hand like midoritsumi—the growth is too hard."},
        {"step": 4, "title": "Plan escape routes", "description": "If working from a ladder within the tree, ensure you have clear access and will not cut branches you are standing on."}
    ]',
    '[
        {"step": 1, "title": "Remove dead wood first", "description": "Starting from the top of the tree, remove all dead branches and twigs from within each foliage mass. This is straightforward and gives immediate improvement."},
        {"step": 2, "title": "Thin excess shoots", "description": "Where there are multiple shoots crowded together, reduce to 2-3 well-placed ones. Remove shoots pointing straight up (tachieda) or straight down (sageeda) as a priority."},
        {"step": 3, "title": "Create separation between layers", "description": "The goal is distinct ''clouds'' of foliage with visible space between them. Thin to create this separation—light and air should flow through the gaps."},
        {"step": 4, "title": "Respect the critical rule", "description": "Never cut beyond the oldest small shoot on any branch. Even if needles remain beyond your cut, the branch will die if you cut past this point."},
        {"step": 5, "title": "Balance the tree", "description": "Thin the top more than the bottom to allow light to reach lower branches. The apex should be lighter and more delicate; lower branches can be slightly fuller."},
        {"step": 6, "title": "Reveal the trunk", "description": "Remove small branches growing directly from the main trunk within the interior. The trunk should be visible as a sculptural element."},
        {"step": 7, "title": "Step back frequently", "description": "Every 20-30 minutes, step back 5+ metres to assess the overall effect. It is easy to over-thin one area while focused close-up."}
    ]',
    '[
        {"step": 1, "title": "Remove all debris", "description": "Clear all cut material from within the tree and from the ground. Shake branches gently to dislodge anything caught in the foliage."},
        {"step": 2, "title": "Assess branch tips", "description": "Now that the interior is thinned, the branch tips may need some needle plucking (momiage) to complete the refined appearance."},
        {"step": 3, "title": "Final walk-around", "description": "View the tree from all angles and from a distance. The branch structure should be visible; light should penetrate through the canopy."}
    ]',
    E'After major sukashi, the tree may look quite sparse. This is intentional—it will fill in over the following 1-2 years while maintaining its new, more refined structure.

Do not fertilise heavily after sukashi. The tree needs time to recover and should not be pushed into excessive new growth.

Monitor for any signs of stress or die-back over the following months. Branches that were borderline may fail. Note these for review the following year.

Sukashi is often combined with momiage in a single autumn session, creating a comprehensive annual maintenance programme.',
    '[
        {"name": "Secateurs", "description": "Sharp bypass secateurs for small branches up to 1cm", "price_range": "£40-120"},
        {"name": "Pruning saw", "description": "Japanese pull-saw for larger branches", "price_range": "£25-80"},
        {"name": "Tripod ladder", "description": "Essential for working safely within and around the tree", "price_range": "£200-600"}
    ]',
    '[
        {"name": "Loppers", "description": "For medium branches 1-3cm diameter", "price_range": "£40-80"},
        {"name": "Pole pruner", "description": "For reaching high branches without climbing", "price_range": "£60-150"}
    ]',
    '[
        {"name": "Cleaning alcohol", "description": "For tool sterilisation"},
        {"name": "Wound sealant", "description": "Optional—for larger cuts over 5cm diameter"}
    ]',
    '["pinus-thunbergii", "pinus-densiflora", "pinus-parviflora", "pinus-nigra", "pinus-sylvestris"]',
    '{
        "pinus-thunbergii": {
            "name": "Japanese Black Pine",
            "notes": "Tolerates fairly aggressive sukashi if tree is healthy"
        },
        "pinus-densiflora": {
            "name": "Japanese Red Pine",
            "notes": "Slightly more conservative approach; more sensitive to over-thinning"
        },
        "pinus-sylvestris": {
            "name": "Scots Pine",
            "notes": "Responds well to sukashi; widely used in UK for Japanese-style gardens"
        }
    }',
    'Renovating neglected pines. Reducing density on over-grown specimens. Revealing branch structure. Combined with momiage for comprehensive autumn maintenance.',
    'Young pines still developing structure. Weak or stressed trees. Trees that have been heavily pruned recently—wait at least one year between major sukashi sessions.',
    '[
        "The key rule: never cut past the oldest small shoot on a branch. If you do, that branch will die even if needles remain.",
        "Spread major renovation over 2-3 years rather than doing everything at once. The tree needs time to recover.",
        "When in doubt, leave more rather than less. You can always remove more next year; you cannot put branches back.",
        "The ''bird flying through'' test: if a bird could not fly through your pine without touching foliage, it needs more thinning.",
        "Remove shoots pointing straight up or straight down as a priority—these disrupt the horizontal layering of branches."
    ]',
    '[
        {"mistake": "Cutting beyond the oldest shoot", "consequence": "Branch dies the following year, even with needles remaining beyond the cut", "prevention": "Identify the oldest small shoot before cutting. Never cut below this point."},
        {"mistake": "Doing too much at once", "consequence": "Tree goes into shock; excessive dieback; possible death", "prevention": "Spread major renovation across 2-3 years. Remove no more than 30% of foliage in any single year."},
        {"mistake": "Thinning the top and bottom equally", "consequence": "Lower branches remain shaded; they weaken and eventually die", "prevention": "Thin the top more heavily to allow light through to lower branches."},
        {"mistake": "Ignoring the overall picture", "consequence": "Unbalanced, patchy result", "prevention": "Step back every 20-30 minutes to assess from a distance. Make adjustments to maintain balance."}
    ]',
    'Branches that lose all their needles after sukashi have likely been cut too hard (beyond the oldest shoot). Excessive resin bleeding from cuts may indicate stress.',
    'If branches die after sukashi, do not remove them immediately—wait until the following summer to confirm death, then prune cleanly back to live wood. Reduce the intensity of sukashi in future years.',
    NULL,
    'Imagine a tree as a building. Sukashi removes interior walls and ceiling panels to reveal the structural beams and columns beneath. The framework becomes visible, with distinct ''rooms'' of foliage separated by open space.',
    'Before: Dense, impenetrable canopy with no visible branch structure; tree appears heavy and solid. After: Light, airy canopy with clearly visible branches; distinct foliage ''clouds'' separated by open space; elegant, refined appearance.',
    '["momiage-needle-plucking", "midoritsumi-candle-pruning"]',
    '[]',
    '{
        "kyoto_gosho": {
            "name": "Kyoto Imperial Palace (Gosho-sukashi)",
            "notes": "Famous regional style emphasising natural appearance. Uses traditional nagae-kama (sickle on pole) for a distinctively organic finish."
        },
        "general_japan": {
            "name": "General Japanese practice",
            "notes": "Standard sukashi as described, often combined with momiage in a single autumn session"
        }
    }',
    FALSE,
    TRUE
),

-- ============================================================================
-- 5. CLOUD PAD SHAPING (TAMAMONO)
-- ============================================================================
(
    'tamamono-cloud-pad-shaping',
    'Cloud Pad Shaping (Tamamono)',
    'Tamamono',
    '玉物',
    'shaping',
    'cloud-formation',
    'The technique of creating individual rounded foliage masses on branches, forming the distinctive "cloud" shapes that give cloud pruning its Western name.',
    E'Tamamono, meaning "ball-shaped things" or "rounded forms," refers to the individual foliage masses that are shaped on branches of cloud-pruned trees. Despite the name, these are never perfect spheres—they are flattened, organic forms, typically wider than tall, with the widest point touching the ground (when on shrubs) or forming distinct horizontal layers (when on trees).

The art of creating cloud pads involves gradual shaping over years, not instant transformation. Starting with a young tree or established specimen, the gardener selects which branches will carry foliage and which will be removed to reveal structure. The remaining branch tips are then shaped into rounded masses, creating the characteristic "clouds floating on a trunk" appearance.

Cloud pads should be asymmetrical and natural-looking, never geometric or regular. Each pad should have some variation in its outline, and the collection of pads across a tree should be balanced but not identical. The Japanese aesthetic favours groups of odd numbers—three, five, or seven clouds often work better than even numbers.

The shape of each cloud should be flatter on top and rounded on the sides, like a cumulus cloud viewed from below, or like a stone worn smooth by flowing water. The underside of each cloud should be flat and clean, with the branch structure visible beneath. When viewed from below, the branches should resemble the veins of a leaf radiating outward.

Creating cloud pads requires patience. On a young tree, it may take 5-10 years to develop well-defined clouds. The work involves annual pruning to maintain and refine the shapes, gradually building density at the branch tips while keeping the areas between clouds clear.',
    E'Cloud-pruned trees have been a feature of Japanese gardens for centuries, though the specific techniques have been refined over generations. The style likely originated in the observation of naturally shaped trees in mountains and coastal areas, where wind, weather, and browsing animals create similar layered forms.

The term "cloud pruning" is a Western interpretation of the Japanese style. In Japan, the focus is less on the "cloud" metaphor and more on the overall aesthetic of the niwaki (garden tree) and its role in the garden composition.',
    E'The cloud pad represents concentrated life force—the essential vitality of the tree condensed into defined masses. Between the clouds, empty space (ma) provides visual rest and emphasises the forms. This interplay of form and void is fundamental to Japanese aesthetics.

Each cloud is also a statement of accumulated time. Unlike a hedge that is cut back to the same point each year, a cloud pad represents years of gradual shaping, with the gardener''s intention visible in every curve and undulation.',
    6,
    'Intermediate to Advanced',
    'Ongoing project over many years',
    '1-3 hours per tree for annual maintenance',
    'Late Spring to Early Summer',
    '{
        "northern_hemisphere": {
            "optimal_window": "May to July for maintenance; any time for initial structural pruning",
            "uk": "June to July for maintenance shaping",
            "japan": "May to June"
        },
        "southern_hemisphere": {
            "optimal_window": "November to January",
            "new_zealand": "December to January"
        }
    }',
    '{
        "march": "Assess tree structure; plan any major branch removal",
        "april": "Remove structural branches before growth begins (deciduous species)",
        "may": "Shape clouds as new growth softens the outline",
        "june": "Primary shaping period—clouds should be well-defined by month end",
        "july": "Light touch-ups and refinement",
        "august": "Second light trim if growth is vigorous"
    }',
    '[
        {"step": 1, "title": "Study the existing structure", "description": "Walk around the tree from all angles. Identify the natural branch arrangement and visualise where clouds could form. Look for branches with good placement and adequate foliage."},
        {"step": 2, "title": "Decide on number and placement", "description": "Odd numbers often work best (3, 5, 7 clouds). Consider balance and asymmetry—clouds should be at different heights and distances from the trunk. Avoid perfect symmetry."},
        {"step": 3, "title": "Plan the trunk exposure", "description": "Determine how much trunk and branch structure will be visible between clouds. Generally, the lower 1/3 of the tree is often bare trunk, with clouds distributed in the upper 2/3."},
        {"step": 4, "title": "Gather appropriate tools", "description": "Secateurs for detailed shaping, loppers for branch removal, and shears for broadleaf species. Karikomi shears for species that tolerate shearing."}
    ]',
    '[
        {"step": 1, "title": "Remove unwanted branches", "description": "Cut away branches that will not carry clouds—typically inner crossing branches, downward-pointing growth, and any branches that would create clouds too close together."},
        {"step": 2, "title": "Clear the trunk", "description": "Remove any small shoots growing directly from the trunk in areas that should be bare. The trunk should be visible as a sculptural element."},
        {"step": 3, "title": "Define cloud boundaries", "description": "For each intended cloud, identify where the foliage mass ends. Clear away any growth between clouds to create distinct separation."},
        {"step": 4, "title": "Shape the cloud outline", "description": "Using secateurs (or shears on shearable species), shape the foliage mass into a rounded form. The top should be slightly flattened; sides rounded; bottom relatively flat and clean."},
        {"step": 5, "title": "Create the characteristic profile", "description": "The cloud should be wider than tall, with the widest point at or near the bottom. Think of a river-worn stone or a cumulus cloud viewed from below."},
        {"step": 6, "title": "Clean the underside", "description": "Remove any downward-pointing growth from beneath the cloud. When looking up from below, you should see the branch structure with the cloud sitting cleanly on top."},
        {"step": 7, "title": "Balance the overall composition", "description": "Step back frequently. Adjust cloud sizes so they relate to each other—larger clouds toward the base, smaller toward the apex. Ensure visual balance without perfect symmetry."}
    ]',
    '[
        {"step": 1, "title": "Clear all cut material", "description": "Remove all pruned branches and foliage from the tree and ground."},
        {"step": 2, "title": "Final shaping", "description": "Walk around the tree at eye level and from elevated positions. Make any final adjustments to cloud outlines."},
        {"step": 3, "title": "Document for future reference", "description": "Photograph the tree from multiple angles. This helps track progress over years and guides future shaping decisions."}
    ]',
    E'Cloud pads require annual maintenance to retain their shape. New growth will soften and eventually obscure the defined forms if left unattended.

On pines, cloud maintenance involves midoritsumi (candle pruning) in spring and momiage (needle plucking) in autumn. On broadleaf evergreens, annual or bi-annual shearing during the growing season maintains the clouds.

Allow 3-5 years for a new cloud to develop full density. Be patient—rushing the process by heavy feeding creates weak, leggy growth that spoils the compact form.',
    '[
        {"name": "Secateurs", "description": "Sharp bypass secateurs for detailed shaping work", "price_range": "£40-120"},
        {"name": "Pruning saw", "description": "For removing larger unwanted branches", "price_range": "£25-80"},
        {"name": "Loppers", "description": "For medium branches during structural work", "price_range": "£40-80"}
    ]',
    '[
        {"name": "Topiary shears", "description": "Short-bladed shears for detailed cloud shaping on shearable species", "price_range": "£50-150"},
        {"name": "Karikomi shears", "description": "Curved Japanese shears for organic forms", "price_range": "£100-200"}
    ]',
    '[]',
    '["ilex-crenata", "buxus-sempervirens", "taxus-baccata", "taxus-cuspidata", "ligustrum-japonicum", "pinus-thunbergii", "pinus-nigra", "pinus-sylvestris", "phillyrea-latifolia", "osmanthus-burkwoodii"]',
    '{
        "pines": {
            "category": "Pine species",
            "notes": "Cloud pads on pines are maintained through candle pruning (midoritsumi) and needle plucking (momiage). Never shear pines.",
            "technique_difference": "Finger-pinching and hand techniques only"
        },
        "broadleaf_evergreens": {
            "category": "Broadleaf evergreens (Ilex, Buxus, etc.)",
            "notes": "Can be shaped with shears or secateurs. Shears faster but secateurs give healthier, longer-lived results.",
            "technique_difference": "Either shearing or individual cuts"
        },
        "taxus": {
            "category": "Yew (Taxus)",
            "notes": "Exceptionally tolerant of shaping. Can regenerate from old wood if mistakes are made.",
            "technique_difference": "Standard shearing works well"
        }
    }',
    'Creating the characteristic "cloud" shapes on niwaki. Transforming ordinary trees into sculptural specimens. Building structure gradually over years.',
    'Very young trees without developed branch structure. Species that do not tolerate hard pruning. Trees in poor health or stressed conditions.',
    '[
        "Cloud pads take years to develop—this is not instant transformation. Patience is the primary requirement.",
        "Odd numbers of clouds (3, 5, 7) are more pleasing than even numbers.",
        "The space between clouds is as important as the clouds themselves. Do not crowd the forms.",
        "Each cloud should be different from its neighbours in size, height, and exact shape.",
        "The underside of each cloud should be flat and clean—as if you could slide a piece of paper beneath the foliage.",
        "When positioning branches for cloud development, consider the mature size. Wiring or weighting may help position branches correctly."
    ]',
    '[
        {"mistake": "Creating perfect spheres", "consequence": "Result looks Western and artificial, not Japanese", "prevention": "Aim for flattened, organic forms—wider than tall, slightly irregular outline."},
        {"mistake": "Spacing clouds evenly", "consequence": "Result looks mechanical and unnatural", "prevention": "Vary the spacing and heights of clouds for asymmetric but balanced composition."},
        {"mistake": "Neglecting the underside", "consequence": "Shaggy, undefined appearance; branch structure hidden", "prevention": "Always clean the underside of each cloud. The branch should be visible beneath."},
        {"mistake": "Rushing development", "consequence": "Weak, leggy growth; poorly defined clouds", "prevention": "Allow 3-5 years for clouds to develop density. Annual maintenance refines the shape gradually."},
        {"mistake": "Positioning clouds too close together", "consequence": "Clouds merge over time; structure becomes confused", "prevention": "Leave generous space between clouds. They will fill out but the separation should remain."}
    ]',
    'If clouds become too dense (brown interior, leggy growth), the plant needs renewal pruning—cutting back harder to stimulate fresh growth. Do this gradually over 2-3 years.',
    'If a cloud becomes misshapen or overgrown, cut back to a smaller size within the current shape. New growth will allow you to reform the cloud over the following 1-2 years. On yew and box, you can cut back quite hard; on pines, never cut into bare wood.',
    NULL,
    'Imagine stacking smooth river stones on a branch—each stone is a cloud, with space visible between them. The stones are various sizes, arranged in an asymmetric but balanced composition.',
    'Before: Ordinary shrub or tree with uncontrolled foliage obscuring branch structure. After: Sculptural form with distinct rounded foliage masses separated by visible branches and open space; elegant, timeless appearance.',
    '["karikomi-hedge-shearing", "branch-selection-edanuki", "trunk-branch-bending"]',
    '["branch-selection-edanuki"]',
    '{}',
    TRUE,
    TRUE
),

-- ============================================================================
-- 6. YUKITSURI (WINTER PROTECTION)
-- ============================================================================
(
    'yukitsuri-winter-protection',
    'Yukitsuri (Snow Protection)',
    'Yukitsuri',
    '雪吊り',
    'protection',
    'winter-care',
    'The Japanese technique of protecting trees from heavy snow by supporting branches with ropes suspended from a central pole, creating the iconic cone-shaped winter garden structures.',
    E'Yukitsuri, meaning "snow hanging" or "snow lifting," is a traditional Japanese technique for protecting trees—especially valued pines—from damage caused by heavy snowfall. A tall bamboo or wooden pole is erected next to the tree''s trunk, extending above the crown. From the top of this pole, straw ropes are suspended outward like the ribs of an umbrella, with each rope tied to a branch to support it against the crushing weight of accumulated snow.

The result is both functional and beautiful: the cone-shaped rope structures have become iconic images of Japanese winter gardens. They transform the garden into a sculpture park during the cold months, when the geometric rope patterns contrast with the organic forms of the trees and the white of the snow.

Yukitsuri is most famously practised at Kenrokuen Garden in Kanazawa, one of Japan''s three great gardens, where hundreds of trees are protected in this way each winter. The installation of the yukitsuri on November 1st marks the beginning of winter preparations and has become a celebrated annual event.

While the primary purpose is protective—without yukitsuri, the carefully trained branches of niwaki could break under heavy snow, destroying decades of careful work—the technique has evolved into an art form in its own right. The number of ropes, their spacing, and the overall form are carefully considered for aesthetic effect as well as structural necessity.

In regions that no longer receive significant snowfall, yukitsuri has been retained as a seasonal marker, signaling the transition to winter and connecting the garden to its cultural heritage.',
    E'Yukitsuri developed in the heavy snowfall regions of Japan''s Sea of Japan coast, particularly in the area around Kanazawa (Ishikawa Prefecture), where winter snow accumulations can be substantial. The technique evolved to protect the valuable shaped pines that were central to garden design—trees that might represent generations of careful cultivation.

Over time, yukitsuri became as much cultural practice as horticultural necessity. The annual installation ceremonies became community events, and the wintertime appearance of the gardens became prized in its own right.',
    E'Yukitsuri represents the Japanese principle of adapting to nature rather than fighting it. Rather than trying to prevent snow accumulation, the gardener accepts it and provides support to help the tree bear the burden. This acceptance—combined with prepared action—reflects broader philosophical principles.

The technique also demonstrates the Japanese appreciation for seasonal change. Rather than seeing winter as a period when the garden "goes to sleep," yukitsuri transforms the winter garden into a different but equally valid form of beauty. The garden changes but never diminishes.',
    5,
    'Intermediate',
    '2-4 hours per tree for installation',
    '1-2 hours per tree for removal',
    'Late Autumn',
    '{
        "northern_hemisphere": {
            "installation": "November",
            "removal": "March to April",
            "japan_kanazawa": "November 1st installation (traditional date)",
            "uk": "November—for gardens with valued specimens in heavy snowfall areas"
        }
    }',
    '{
        "october": "Prepare materials—bamboo poles, straw rope, anchoring stakes",
        "november": "Install yukitsuri before first significant snowfall",
        "december_to_march": "Monitor and adjust as needed after snowfall",
        "march_april": "Remove yukitsuri as risk of heavy snow passes"
    }',
    '[
        {"step": 1, "title": "Assess the tree", "description": "Identify which branches are most vulnerable to snow damage—typically long horizontal branches extending from cloud-pruned pines. Note the tree''s height and spread."},
        {"step": 2, "title": "Prepare the pole", "description": "Select a bamboo or wooden pole that will extend 30-60cm above the tree''s crown. The pole must be sturdy enough to support the rope system and any accumulated snow."},
        {"step": 3, "title": "Calculate rope requirements", "description": "You will need enough rope to create lines from the top of the pole to each branch tip that needs support, plus extra for anchoring and tying."},
        {"step": 4, "title": "Prepare rope bundles", "description": "Traditional straw rope is preferred. Cut to length and bundle together at the pole end. The number of ropes depends on tree size—often 10-20 lines."}
    ]',
    '[
        {"step": 1, "title": "Position the pole", "description": "Place the pole as close to the trunk as possible, typically on the leeward side (away from prevailing wind). The pole should be vertical and stable."},
        {"step": 2, "title": "Secure the pole base", "description": "Tie the pole firmly to the trunk at one or two points. For large trees, the pole may also need guying or anchoring to the ground."},
        {"step": 3, "title": "Attach rope bundle at top", "description": "Tie the bundle of ropes firmly to the top of the pole. The ropes should radiate outward like spokes of a wheel when viewed from above."},
        {"step": 4, "title": "Distribute ropes evenly", "description": "Working with a team if possible, separate the individual ropes and distribute them evenly around the tree. Each rope should align with a branch that needs support."},
        {"step": 5, "title": "Tie to branches", "description": "Tie each rope to its corresponding branch, typically near the branch tip. The rope should be taut enough to provide support but not so tight that it lifts the branch unnaturally."},
        {"step": 6, "title": "Anchor or weight the ropes", "description": "Some systems anchor rope ends in the ground with stakes; others weight the ropes to provide counterbalance. In traditional Japanese practice, ropes may be tied to ground stakes or nearby bushes."},
        {"step": 7, "title": "Add finishing touches", "description": "Traditional installations often include a wari-bochi (woven straw cap) at the top of the pole. Check all ties and ensure the system is stable."}
    ]',
    '[
        {"step": 1, "title": "Step back and assess", "description": "View the completed yukitsuri from multiple angles. The rope lines should be evenly spaced and the overall form should be symmetrical and pleasing."},
        {"step": 2, "title": "Make adjustments", "description": "Adjust any ropes that are too tight, too loose, or poorly positioned."},
        {"step": 3, "title": "Document the installation", "description": "Photograph for future reference. Note any adjustments needed for next year."}
    ]',
    E'After heavy snowfall, check the yukitsuri and shake off accumulated snow if weights are becoming excessive.

Remove yukitsuri in March or April when the risk of heavy snow has passed. Store poles and any reusable rope for next season.

Inspect branches after removal for any damage or stress. Address any problems before the growing season begins.',
    '[
        {"name": "Bamboo or wooden pole", "description": "Sturdy pole extending above tree crown—typically 3-5 metres for medium trees", "price_range": "Variable"},
        {"name": "Straw rope (traditional) or synthetic rope", "description": "Length depends on tree size—calculate needs carefully", "price_range": "Variable"},
        {"name": "Ground stakes or anchors", "description": "For securing rope ends", "price_range": "£10-30"}
    ]',
    '[
        {"name": "Wari-bochi (straw cap)", "description": "Traditional woven straw cover for pole top", "price_range": "Handmade or import"},
        {"name": "Ladder", "description": "For working at height during installation", "price_range": "£100-300"}
    ]',
    '[
        {"name": "Tie material", "description": "For securing pole to trunk and ropes to branches"},
        {"name": "Protective padding", "description": "To prevent rope from damaging bark"}
    ]',
    '["pinus-thunbergii", "pinus-densiflora", "pinus-parviflora", "pinus-sylvestris", "prunus-serrulata"]',
    '{
        "pines": {
            "category": "Pine trees",
            "notes": "Primary subjects for yukitsuri. Horizontal branches on niwaki are particularly vulnerable to snow damage."
        },
        "ornamental_cherries": {
            "category": "Ornamental cherries and other flowering trees",
            "notes": "May benefit from protection for valued specimens with horizontal branches."
        }
    }',
    'Protecting valued trees from snow damage in regions with significant snowfall. Creating traditional winter garden aesthetics. Cultural connection to Japanese gardening heritage.',
    'Regions without significant snowfall (though it may be retained as a decorative element). Trees with naturally strong, upright branch structure. Very young trees not yet requiring protection.',
    '[
        "Traditional straw rope is preferred for authenticity but synthetic alternatives work functionally.",
        "The cone shape should be slightly asymmetric, not perfectly geometric—mirroring the tree beneath.",
        "In heavy snowfall, check after each significant snowfall and shake off excessive accumulation.",
        "Installation is traditionally a team activity—extra hands make the work easier and faster.",
        "The visual impact of yukitsuri is part of the winter garden experience—position for best effect."
    ]',
    '[
        {"mistake": "Rope too tight", "consequence": "Unnatural branch position; potential bark damage", "prevention": "Ropes should support, not lift. Allow natural branch angle."},
        {"mistake": "Pole too short", "consequence": "Inadequate angle for rope support; poor aesthetic", "prevention": "Pole should extend at least 30cm above tree crown."},
        {"mistake": "Uneven rope distribution", "consequence": "Some branches unsupported; unbalanced appearance", "prevention": "Plan rope placement carefully before installation."}
    ]',
    'Creaking or movement in the system during wind indicates potential problems. Check after storms.',
    'If branches break despite yukitsuri, the system may have been incorrectly installed or the snow load exceptional. Prune broken branches cleanly and review installation for next season.',
    NULL,
    'Imagine an umbrella inverted over the tree: the pole is the handle extending upward, and the ropes are the umbrella ribs extending outward and down to the branch tips.',
    'Before installation: Valuable niwaki vulnerable to snow damage. After installation: Protected tree within elegant cone of supporting ropes, transformed into winter sculpture. After snowfall: Dramatic contrast of white snow, dark branches, and geometric rope lines.',
    '["komo-maki-trunk-wrapping", "shiki-matsuba-needle-covering"]',
    '[]',
    '{
        "kanazawa_japan": {
            "name": "Kanazawa / Kenrokuen Garden",
            "notes": "The premier location for yukitsuri. Annual installation begins November 1st with ceremony. Hundreds of trees protected with elaborate systems."
        },
        "tokyo_area": {
            "name": "Tokyo and surroundings",
            "notes": "Limited snowfall means yukitsuri is now primarily decorative/cultural rather than protective. Seen at Hibiya Park, Yoyogi Park, and other gardens."
        },
        "portland_oregon": {
            "name": "Portland Japanese Garden (USA)",
            "notes": "Yukitsuri installed seasonally as cultural practice, revived in recent years after decades of absence."
        }
    }',
    FALSE,
    TRUE
),

-- ============================================================================
-- 7. TRUNK AND BRANCH BENDING
-- ============================================================================
(
    'trunk-branch-bending',
    'Trunk and Branch Bending',
    'Various techniques',
    NULL,
    'training',
    'structural-shaping',
    'The techniques of shaping tree trunks and branches through weights, guy-wires, and ties to create desired forms including curves, horizontal extensions, and cascading effects.',
    E'One of the defining characteristics of mature niwaki is the appearance of age and character expressed through curving trunks, horizontal branches, and sometimes dramatically cascading limbs. While nature creates these forms over decades or centuries through wind, gravity, and the weight of snow and foliage, the Japanese gardener accelerates and controls this process through deliberate training.

Branch bending techniques fall into several categories:

**Guy-wires** attach to branches and pull them downward or sideways, anchored to stakes in the ground, to the tree''s own trunk or roots, or to stable nearby structures. The tension is gradually increased over time until the branch ''sets'' in the new position.

**Weights** are attached to branches to pull them downward through gravity alone. Traditional weights might be stones attached by rope; modern practice might use purpose-made weights with hooks. The gradual, constant force is often gentler than guy-wires.

**Ties** bind branches to bamboo supports or to each other, holding them in desired positions as they set.

**Wedges and spacers** are inserted into branch crotches to spread branches apart, or between the trunk and branches to increase angles.

The key principle is that young, supple wood responds to sustained pressure by growing in the new position. Once the wood has matured with the new form, the supports can be removed. This process typically takes one to three growing seasons, depending on the species and branch size.

Trunk bending follows similar principles but must be done on young trees when the trunk is still flexible. Once a trunk has lignified (become woody), major changes are impossible without damage.',
    E'Branch bending techniques were developed in both the bonsai and niwaki traditions, with the garden-scale techniques being somewhat simpler than the intricate wiring used in bonsai. The principles are ancient—gardeners in China and Japan have been shaping trees for centuries.

In traditional Japanese practice, the emphasis is on natural materials—hemp rope, bamboo stakes, and stones for weights—reflecting the philosophical commitment to working in harmony with nature rather than imposing artificial structures.',
    E'Branch bending represents the gardener''s patient collaboration with the tree. Rather than cutting away unwanted form, the gardener gently guides the existing growth into the desired shape. This requires understanding how the tree grows, how it responds to pressure, and how much force it can tolerate without damage.

The horizontally extending or downward-cascading branches of mature trees suggest age, gravity, and the accumulation of time. By training young branches into these forms, the gardener evokes centuries of natural growth in a fraction of the time—yet the training must still unfold over years, teaching patience.',
    6,
    'Intermediate to Advanced',
    '1-2 hours per tree for initial setup; ongoing monitoring',
    'Check monthly during growing season',
    'Spring to Early Summer (during active growth)',
    '{
        "northern_hemisphere": {
            "optimal_window": "April to July—when branches are actively growing and most flexible",
            "uk": "May to July",
            "avoid": "Winter—frozen branches may snap"
        }
    }',
    '{
        "march_april": "Assess trees and plan shaping goals. Remove any remnants of previous season''s wires.",
        "may_june": "Apply new wires, weights, or ties during active growth period",
        "monthly_through_season": "Check tension, adjust as needed, watch for bark damage",
        "september_october": "Assess progress. Some wires may be removed if branches have set; others may need another season."
    }',
    '[
        {"step": 1, "title": "Visualise the goal", "description": "Before applying any pressure, visualise the desired final form. Where should this branch be in 5 years? What angle serves the overall design?"},
        {"step": 2, "title": "Assess flexibility", "description": "Gently test the branch''s flexibility by hand. Younger, smaller branches bend easily; older, larger ones require more gradual work over multiple seasons."},
        {"step": 3, "title": "Choose your method", "description": "Guy-wires work well for pulling branches down or sideways. Weights are gentler for gradual downward training. Ties and stakes work for holding branches in specific positions."},
        {"step": 4, "title": "Protect the bark", "description": "Always use protective material (rubber, cloth, or tubing) where ropes or wires contact bark. Without protection, pressure creates permanent scars or cuts into the wood."}
    ]',
    '[
        {"step": 1, "title": "Prepare anchor points", "description": "For guy-wires, establish secure anchor points—ground stakes, sturdy roots, or the tree''s own trunk. Anchors must be stable enough to maintain tension."},
        {"step": 2, "title": "Attach to branch with protection", "description": "Wrap the contact point on the branch with protective material. Attach the wire or rope securely but not so tight it constricts the branch."},
        {"step": 3, "title": "Apply gradual pressure", "description": "Do not attempt to achieve the final position immediately. Apply enough tension to gently stress the branch, then wait 2-3 weeks before increasing. Rushing risks branch damage."},
        {"step": 4, "title": "For weights, start light", "description": "Attach a weight that pulls the branch slightly, not dramatically. Increase weight gradually over weeks. The branch will strengthen and adapt."},
        {"step": 5, "title": "For trunk bending (young trees)", "description": "Use stakes and ties to guide the trunk in the desired direction. Adjust ties as the tree grows, maintaining gentle pressure without cutting into bark."},
        {"step": 6, "title": "Monitor regularly", "description": "Check all wires, ties, and weights at least monthly during the growing season. Watch for any sign of bark damage, girdling, or stress. Adjust or release tension if problems appear."},
        {"step": 7, "title": "Allow time for setting", "description": "Most branches require 1-3 growing seasons to set in a new position. Do not remove supports until the branch remains in position when temporarily released."}
    ]',
    '[
        {"step": 1, "title": "Test for setting", "description": "After 6-12 months, carefully release tension on one support without removing it. Does the branch spring back significantly? If so, it needs more time."},
        {"step": 2, "title": "Remove supports gradually", "description": "When the branch holds its position with tension released, remove supports. Monitor for any spring-back over the following weeks."},
        {"step": 3, "title": "Address any damage", "description": "Remove any protective material and inspect the bark. Minor marks will heal; deeper damage may need attention."}
    ]',
    E'Once branches have set, they rarely need retreatment. However, new growth from trained branches may eventually need its own training.

Very old branches that have been in position for years are essentially permanent—the wood has fully matured and will not spring back.

On younger, growing trees, continue to monitor and adjust as the tree develops. Training is an ongoing dialogue with the tree, not a one-time intervention.',
    '[
        {"name": "Guy-wire (galvanised or coated)", "description": "1-2mm diameter for smaller branches; up to 4mm for larger ones", "price_range": "£10-20 per roll"},
        {"name": "Ground stakes", "description": "Metal or bamboo stakes for anchoring guy-wires", "price_range": "£10-30"},
        {"name": "Protective tubing/rubber", "description": "To prevent wire cutting into bark", "price_range": "£5-15"}
    ]',
    '[
        {"name": "Training weights", "description": "Purpose-made weights with hooks, or smooth stones with rope loops", "price_range": "£15-40 for sets"},
        {"name": "Bamboo stakes", "description": "For trunk training and branch positioning", "price_range": "£10-20"},
        {"name": "Hemp or sisal rope", "description": "Traditional material for tying", "price_range": "£15-30"}
    ]',
    '[
        {"name": "Turnbuckles", "description": "For precise tension adjustment on guy-wires"},
        {"name": "Wire cutters", "description": "For removing wires when training is complete"}
    ]',
    '["pinus-thunbergii", "pinus-densiflora", "pinus-sylvestris", "juniperus-chinensis", "taxus-baccata", "acer-palmatum"]',
    '{
        "pines": {
            "category": "Pines",
            "notes": "Respond well to gradual bending. Avoid bending during winter or when stressed."
        },
        "maples": {
            "category": "Japanese Maple",
            "notes": "Young branches are very flexible. Can achieve significant curves quickly but monitor closely for damage."
        },
        "junipers": {
            "category": "Juniper",
            "notes": "Very flexible when young. Classic subject for dramatic bending in bonsai tradition."
        }
    }',
    'Creating horizontal or cascading branches on niwaki. Training young trunks into interesting forms. Accelerating the appearance of age and character.',
    'Old, inflexible branches. Trees that are stressed or unhealthy. Winter months when branches are more brittle. Any species known to have brittle wood.',
    '[
        "The goal is to stress the wood just enough to stimulate adaptive growth without causing damage. Patience is essential.",
        "Always use protection where wires or ropes contact bark. Scars from wire damage are permanent.",
        "In Japanese practice, natural materials are preferred—hemp rope and bamboo rather than wire and plastic.",
        "Check monthly during growing season. A wire left too long will cut into expanding bark.",
        "If a branch cracks or splits during bending, stop immediately. It may still survive if the damage is partial.",
        "Branches bend more easily when turgid (well-watered) and during active growth."
    ]',
    '[
        {"mistake": "Applying too much force too quickly", "consequence": "Branch breaks or cracks; bark damage; stress that may not heal", "prevention": "Apply force gradually over weeks or months. If you hear any cracking, stop immediately and reduce tension."},
        {"mistake": "Forgetting to check wires", "consequence": "Wire cuts into growing bark, leaving permanent scars or girdling the branch", "prevention": "Check all wires monthly during growing season. Remove or reposition before they cut in."},
        {"mistake": "Bending in winter or during drought", "consequence": "Brittle wood more likely to crack; reduced ability to heal", "prevention": "Bend during the growing season when sap is flowing and branches are flexible."},
        {"mistake": "Not using protection", "consequence": "Wire or rope cuts into bark, leaving permanent damage", "prevention": "Always use protective tubing, rubber, or cloth at contact points."}
    ]',
    'Creaking or cracking sounds during bending indicate stress at or beyond safe limits. Bark discoloration or oozing sap near contact points indicates damage. Spring-back when tension is released shows the branch has not yet set.',
    'If a branch partially cracks, reduce tension immediately but do not remove the support entirely—the support may be helping hold the damaged area together. Leave until the wound has callused (typically one growing season), then reassess.',
    NULL,
    'Think of the tree as a soft sculpture being slowly formed. Pressure is applied, and over time the material yields and holds the new shape—but too much pressure too fast would tear the material.',
    'Before: Young tree with naturally upright branches. After training (1-3 years): Same tree with elegantly horizontal or cascading branches suggesting age and character. The trunk may have interesting curves trained in during its youth.',
    '["tamamono-cloud-pad-shaping", "branch-selection-edanuki"]',
    '[]',
    '{}',
    FALSE,
    TRUE
),

-- ============================================================================
-- 8. NIWAKI STYLES
-- ============================================================================
(
    'niwaki-styles-forms',
    'Niwaki Styles and Forms',
    'Various',
    NULL,
    'style',
    'design-principles',
    'The traditional forms and styles used in Japanese garden tree design, including formal upright, informal upright, slanting, cascade, and windswept styles.',
    E'Japanese garden trees (niwaki) are shaped according to traditional styles that have evolved over centuries. These styles provide a vocabulary for designing and describing shaped trees, though in practice, most niwaki incorporate elements from multiple styles rather than rigidly adhering to a single form.

**Chokkan (Formal Upright)**: A straight, upright trunk with branches arranged in horizontal layers, decreasing in size toward the apex. This formal style represents a tree growing in ideal conditions without wind stress or adversity. It conveys strength, stability, and dignity.

**Moyogi (Informal Upright)**: The trunk grows generally upward but with gentle S-curves or bends, reflecting natural response to environmental factors. Branches are distributed asymmetrically. This is the most common and versatile style, capturing the natural character of most trees.

**Shakan (Slanting)**: The trunk grows at an angle (typically 30-60 degrees from vertical), as if the tree has adapted to strong prevailing winds or is growing on a slope. Branches may extend further on the lower side to maintain visual balance.

**Kengai (Cascade)**: The trunk rises briefly before cascading downward, often below the base of the planting. This style evokes a tree growing on a cliff face, with branches reaching toward light below. A dramatic form rarely used in niwaki but borrowed from bonsai tradition.

**Han-Kengai (Semi-Cascade)**: Similar to cascade but the trunk descends only to horizontal or slightly below, not dramatically downward. More practical for garden trees than full cascade.

**Fukinagashi (Windswept)**: All branches sweep in one direction, as if the tree has been shaped by constant prevailing wind. The trunk may lean in the direction of the "wind" or angle against it with branches trailing behind.

**Multi-trunk forms**: Sōkan (twin trunk), Sankan (triple trunk), Kabudachi (clump style), and Yose-ue (forest planting) all feature multiple trunks from one root system.

These styles guide the initial training of trees and inform ongoing maintenance decisions, but the ultimate goal is always a tree that appears natural within its garden context—as if it grew to its form over centuries.',
    E'The classification of tree styles originated in Chinese penjing and was refined and codified in Japan, particularly through the bonsai tradition. While bonsai practice developed an extensive and precise vocabulary of styles, niwaki (garden trees) draws on the same concepts more loosely, adapting them to the larger scale and different context of garden design.

The styles are not arbitrary aesthetic categories but reflect observations of how trees grow in nature. Formal upright represents ideal conditions; windswept represents constant exposure; cascade represents cliff-dwelling trees. By understanding what each style represents, the gardener can match style to context.',
    E'The styles of niwaki embody the Japanese principle that art should follow nature. Each style represents a natural form—trees shaped by their environment over time. The gardener''s role is to reveal and enhance these natural tendencies, not to impose arbitrary shapes.

The choice of style for a particular tree should emerge from the tree''s own character. A naturally twisting trunk suggests moyogi; a tree with low growth on one side might be trained as shakan. Working with the tree''s tendencies rather than against them produces more convincing results and healthier trees.',
    5,
    'Intermediate (understanding) / Advanced (execution)',
    'Varies by style and tree development stage',
    'Ongoing project over many years',
    'Year-round (planning); Growing season (execution)',
    '{
        "northern_hemisphere": {
            "note": "Style decisions are made year-round; major training work during growing season"
        }
    }',
    '{}',
    '[
        {"step": 1, "title": "Study the tree''s natural tendencies", "description": "Before deciding on a style, observe the tree. Does it have a natural lean? Interesting trunk movement? Strong growth on one side? Work with what the tree offers."},
        {"step": 2, "title": "Consider the garden context", "description": "How will this tree relate to its surroundings? A formal upright might suit a gateway; a slanting style might complement a slope; a windswept tree might evoke coastal conditions."},
        {"step": 3, "title": "Research the species", "description": "Some species lend themselves to particular styles. Pines suit formal and informal upright; cascading forms are rarely practical at garden scale except in special situations."},
        {"step": 4, "title": "Plan the long-term development", "description": "Style development happens over years or decades. Create a vision of the mature tree and work toward it incrementally."}
    ]',
    '[
        {"step": 1, "title": "For Chokkan (Formal Upright)", "description": "Select a tree with a straight, tapered trunk. Remove or train branches to create horizontal layers that decrease in size toward the apex. The first branch (ichi-no-eda) is typically the largest and lowest."},
        {"step": 2, "title": "For Moyogi (Informal Upright)", "description": "Work with natural trunk curves or train gentle curves into young trunks. Distribute branches asymmetrically, with larger branches coming from the outside of curves. The apex should be above the base of the trunk."},
        {"step": 3, "title": "For Shakan (Slanting)", "description": "Train or select a trunk that grows at an angle. Position roots strongly on the side opposite the lean to suggest stability. Balance the branch mass—often more branches on the lower side to counterweight the lean."},
        {"step": 4, "title": "For Fukinagashi (Windswept)", "description": "Train branches to sweep in one direction. The trunk may lean with or against the ''wind'' direction. Create a sense of movement and dynamic tension. Remove any branches growing against the dominant direction."},
        {"step": 5, "title": "Refine annually", "description": "Style development is ongoing. Each year''s maintenance should refine and enhance the chosen style while remaining responsive to the tree''s growth."}
    ]',
    '[
        {"step": 1, "title": "Assess from a distance", "description": "Stand back and view the tree in its garden context. Does the style work with the surroundings? Does it convey the intended feeling?"},
        {"step": 2, "title": "Document progress", "description": "Photograph the tree from consistent positions over years. This documents development and guides future decisions."}
    ]',
    E'Style development continues throughout the life of the tree. Annual maintenance pruning should reinforce the chosen style while allowing the tree to develop naturally within that framework.

Styles are guides, not straitjackets. The best niwaki often combine elements from multiple styles, and the goal is always a tree that appears natural and at home in its setting.',
    '[
        {"name": "Secateurs", "description": "For detailed pruning work", "price_range": "£40-120"},
        {"name": "Pruning saw", "description": "For branch removal", "price_range": "£25-80"}
    ]',
    '[
        {"name": "Guy-wires and training materials", "description": "For bending branches into position", "price_range": "Variable"},
        {"name": "Reference books", "description": "Jake Hobson''s ''Niwaki'' is the essential guide", "price_range": "£20-30"}
    ]',
    '[]',
    '["pinus-thunbergii", "pinus-densiflora", "pinus-parviflora", "pinus-sylvestris", "taxus-baccata", "ilex-crenata", "juniperus-chinensis"]',
    '{
        "pines": {
            "category": "Pines",
            "notes": "Suit formal and informal upright styles particularly well. The horizontal branching of mature pines is a defining characteristic of niwaki."
        },
        "broadleaf_evergreens": {
            "category": "Broadleaf evergreens",
            "notes": "Often trained in informal upright or multi-trunk styles. Good for clump plantings."
        }
    }',
    'Understanding traditional design vocabulary. Planning long-term tree development. Matching trees to garden contexts.',
    'These are not rigid rules but flexible guides. Any style can be adapted to circumstances.',
    '[
        "Work with the tree''s natural tendencies rather than against them.",
        "The best niwaki often combine elements from multiple styles.",
        "Style should serve the garden context—choose forms that work with surrounding elements.",
        "Development happens over decades. Plant with the future in mind.",
        "Study trees in nature and in great gardens to develop your eye for pleasing forms."
    ]',
    '[
        {"mistake": "Forcing a style that doesn''t suit the tree", "consequence": "Awkward, unconvincing result; possible tree damage", "prevention": "Study the tree''s natural form and work with its tendencies."},
        {"mistake": "Trying to change style mid-development", "consequence": "Confused, inconsistent form", "prevention": "Commit to a style and develop it consistently over years."},
        {"mistake": "Copying without understanding", "consequence": "Superficial imitation that lacks conviction", "prevention": "Study the principles behind each style; understand what it represents in nature."}
    ]',
    'A tree that looks awkward or unnatural has likely been forced into an unsuitable style.',
    'If a chosen style clearly isn''t working, it may be better to reassess and work with the tree''s natural tendencies rather than continuing to fight them.',
    NULL,
    'Think of styles as regional accents in a language—they provide recognisable patterns while allowing infinite individual variation.',
    'Young nursery tree with undefined form → Mature niwaki with clear style character, appearing as if it has grown naturally into its shape over decades.',
    '["tamamono-cloud-pad-shaping", "trunk-branch-bending", "branch-selection-edanuki"]',
    '[]',
    '{}',
    FALSE,
    TRUE
);

-- ============================================================================
-- INDEXES
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_techniques_slug ON techniques(slug);
CREATE INDEX IF NOT EXISTS idx_techniques_category ON techniques(category);
CREATE INDEX IF NOT EXISTS idx_techniques_published ON techniques(published);
CREATE INDEX IF NOT EXISTS idx_techniques_featured ON techniques(featured);
CREATE INDEX IF NOT EXISTS idx_techniques_difficulty ON techniques(difficulty_level);

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================

ALTER TABLE techniques ENABLE ROW LEVEL SECURITY;

-- Public read access for published techniques
CREATE POLICY "Public read access for published techniques" ON techniques
    FOR SELECT USING (published = TRUE);

-- ============================================================================
-- TRIGGERS
-- ============================================================================

-- Auto-update timestamps
CREATE OR REPLACE FUNCTION update_techniques_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS techniques_timestamp ON techniques;
CREATE TRIGGER techniques_timestamp
    BEFORE UPDATE ON techniques
    FOR EACH ROW
    EXECUTE FUNCTION update_techniques_timestamp();

-- ============================================================================
-- VIEW COUNT FUNCTION
-- ============================================================================

CREATE OR REPLACE FUNCTION increment_technique_view_count(technique_slug VARCHAR)
RETURNS VOID AS $$
BEGIN
    UPDATE techniques 
    SET view_count = view_count + 1 
    WHERE slug = technique_slug;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- SUMMARY
-- ============================================================================
-- 
-- This file contains 8 comprehensive technique entries:
-- 
-- 1. Midoritsumi (Candle Pruning) - Pine spring technique
-- 2. Momiage (Needle Plucking) - Pine autumn technique  
-- 3. Karikomi (Hedge Shearing) - Broadleaf shaping
-- 4. Sukashi (Thinning) - Pine structural pruning
-- 5. Tamamono (Cloud Pad Shaping) - Creating cloud forms
-- 6. Yukitsuri (Winter Protection) - Snow protection ropes
-- 7. Trunk and Branch Bending - Training techniques
-- 8. Niwaki Styles and Forms - Design vocabulary
--
-- Each entry includes:
-- - Full Japanese terminology with characters
-- - Comprehensive descriptions and history
-- - Detailed step-by-step guides
-- - Species-specific variations
-- - Regional timing adjustments
-- - Common mistakes and prevention
-- - Pro tips from expert sources
-- - Tool requirements with price ranges
-- - Related techniques for navigation
--
-- Total: ~2,500 lines of production-ready content
-- ============================================================================
