from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent

# You can either hardcode the text here OR load it from the txt file.
# Recommended: load from txt so you can edit without touching Python.

_INUNDATION_TXT_PATH = BASE_DIR / "data" / "inundation_data.txt"

# Fallback if file is missing
_FALLBACK_TEXT = """
Inundation is a major mine hazard. Key facts:
- Coal mine disasters: Chasnalla 1975 (375 deaths), Gaslitand 1995 (64),
  Newton Chikli 1954 (63), Bagdigi 2001 (29).
- Non-coal mines 2016-2022: ~12 water-related fatal accidents.
- Regulations: CMR 1957/2017 Reg 127, 128, 129, 137, 142, 150, 239;
  MMR 1961 Reg 106, 114, 128, 181, 242; OMR 2017 Reg 130(d), 133.
- Causes: barrier failure, inrush from abandoned workings, monsoon
  flooding, unauthorized entry, poor supervision, SOP non-compliance.
- Prevention: fencing, life-lines, risk assessment, SMP, SOP, water
  level monitoring, adequate parting thickness, periodic inspections.
"""

def load_inundation_context() -> str:
    """Load inundation reference text from data folder."""
    try:
        if _INUNDATION_TXT_PATH.exists():
            text = _INUNDATION_TXT_PATH.read_text(encoding="utf-8", errors="replace")
            if text.strip():
                return text.strip()
    except Exception as exc:
        print(f"[inundation] Failed to load txt: {exc}", flush=True)
    return _FALLBACK_TEXT.strip()