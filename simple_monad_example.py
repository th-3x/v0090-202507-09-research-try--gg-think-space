"""
Simplified Python Monad Implementation of Thinking Space App
Showing the functional pipeline pattern
"""

from typing import Any, Callable, List, Dict
import json

class Monad:
    def __init__(self, value: Any):
        self.value = value
        self.error = None
    
    def pipe(self, func: Callable) -> 'Monad':
        """Chain operations together - equivalent to .then() in JS"""
        if self.error:
            return self
        try:
            result = func(self.value)
            return Monad(result)
        except Exception as e:
            error_monad = Monad(None)
            error_monad.error = str(e)
            return error_monad
    
    def get(self) -> Any:
        """Extract the value"""
        if self.error:
            raise Exception(f"Monad contains error: {self.error}")
        return self.value
    
    def get_or_else(self, default: Any) -> Any:
        """Get value or return default if error"""
        return default if self.error else self.value

# React equivalent: ReactDOM.createRoot(document.getElementById('root')).render(<App />)
def create_root(element_id: str):
    return f"Root created for #{element_id}"

def render_app(root_info):
    return {
        'root': root_info,
        'app_rendered': True,
        'components': ['PhotoViz', 'Sidebar', 'App']
    }

def init_store(app_info):
    return {
        **app_info,
        'state': {
            'photos': [],
            'query': '',
            'is_loading': False,
            'layout': 'grid',
            'sidebar_open': False
        }
    }

def setup_ai(app_state):
    return {
        **app_state,
        'ai': {
            'gemini_initialized': True,
            'api_key': 'your-api-key',
            'model': 'gemini-pro'
        }
    }

def setup_3d_scene(app_state):
    return {
        **app_state,
        'visualization': {
            'scene': 'THREE.Scene()',
            'camera': 'PerspectiveCamera',
            'renderer': 'WebGLRenderer',
            'ready': True
        }
    }

# AI Operations
def send_query(query: str):
    def _send_query(app_state):
        # Simulate AI response
        response = f"AI found photos related to: {query}"
        mock_photos = [
            {'id': 1, 'title': f'{query} photo 1', 'url': 'photo1.jpg'},
            {'id': 2, 'title': f'{query} photo 2', 'url': 'photo2.jpg'},
            {'id': 3, 'title': f'{query} photo 3', 'url': 'photo3.jpg'},
        ]
        
        return {
            **app_state,
            'state': {
                **app_state['state'],
                'photos': mock_photos,
                'query': query,
                'is_loading': False
            },
            'ai': {
                **app_state['ai'],
                'last_response': response
            }
        }
    return _send_query

def set_loading(loading: bool):
    def _set_loading(app_state):
        return {
            **app_state,
            'state': {
                **app_state['state'],
                'is_loading': loading
            }
        }
    return _set_loading

def apply_layout(layout_type: str):
    def _apply_layout(app_state):
        photos = app_state['state']['photos']
        positioned_photos = []
        
        for i, photo in enumerate(photos):
            if layout_type == 'grid':
                position = [(i % 3) * 3, (i // 3) * 2, 0]
            elif layout_type == 'circle':
                import math
                angle = (i / len(photos)) * 2 * math.pi
                position = [math.cos(angle) * 5, math.sin(angle) * 5, 0]
            else:
                position = [i * 2, 0, 0]
            
            positioned_photos.append({
                **photo,
                'position': position
            })
        
        return {
            **app_state,
            'state': {
                **app_state['state'],
                'photos': positioned_photos,
                'layout': layout_type
            }
        }
    return _apply_layout

def toggle_sidebar(app_state):
    return {
        **app_state,
        'state': {
            **app_state['state'],
            'sidebar_open': not app_state['state']['sidebar_open']
        }
    }

# Main App Pipeline - equivalent to the React app initialization
def main():
    print("=== Thinking Space App - Python Monad Style ===\n")
    
    # App Initialization Pipeline
    # Equivalent to: ReactDOM.createRoot().render(<App />)
    print("1. App Initialization Pipeline:")
    app_result = (
        Monad('root')
        .pipe(create_root)
        .pipe(render_app)
        .pipe(init_store)
        .pipe(setup_ai)
        .pipe(setup_3d_scene)
    )
    
    app_state = app_result.get()
    print(f"   ✓ Root: {app_state['root']}")
    print(f"   ✓ Components: {app_state['components']}")
    print(f"   ✓ State initialized: {bool(app_state['state'])}")
    print(f"   ✓ AI ready: {app_state['ai']['gemini_initialized']}")
    print(f"   ✓ 3D Scene ready: {app_state['visualization']['ready']}")
    
    # Photo Search Pipeline
    # Equivalent to: sendQuery('winter') in actions.js
    print("\n2. Photo Search Pipeline:")
    search_result = (
        Monad(app_state)
        .pipe(set_loading(True))
        .pipe(send_query('winter landscapes'))
        .pipe(apply_layout('grid'))
    )
    
    final_state = search_result.get()
    print(f"   ✓ Query: {final_state['state']['query']}")
    print(f"   ✓ Photos found: {len(final_state['state']['photos'])}")
    print(f"   ✓ Layout: {final_state['state']['layout']}")
    print(f"   ✓ AI Response: {final_state['ai']['last_response']}")
    
    # Layout Change Pipeline
    # Equivalent to: setLayout('circle') in actions.js
    print("\n3. Layout Change Pipeline:")
    layout_result = (
        Monad(final_state)
        .pipe(apply_layout('circle'))
        .pipe(toggle_sidebar)
    )
    
    new_state = layout_result.get()
    print(f"   ✓ New layout: {new_state['state']['layout']}")
    print(f"   ✓ Sidebar open: {new_state['state']['sidebar_open']}")
    print(f"   ✓ Photo positions updated: {len(new_state['state']['photos'])} photos")
    
    # Show photo positions
    print("\n4. Photo Positions in 3D Space:")
    for photo in new_state['state']['photos'][:2]:  # Show first 2
        print(f"   • {photo['title']}: position {photo['position']}")
    
    # Error Handling Example
    print("\n5. Error Handling:")
    error_result = (
        Monad("test")
        .pipe(lambda x: x.upper())
        .pipe(lambda x: x / 0)  # This will cause an error
        .pipe(lambda x: x.lower())
    )
    print(f"   ✗ Error caught: {error_result.error}")
    print(f"   ✓ Safe fallback: {error_result.get_or_else('default_value')}")

# Comparison with original React/JS code
def show_comparison():
    print("\n" + "="*60)
    print("COMPARISON: React/JS vs Python Monad")
    print("="*60)
    
    print("\n📱 React/JS Original:")
    print("""
    // index.tsx
    ReactDOM.createRoot(document.getElementById('root'))
      .render(<App />)
    
    // actions.js
    export const sendQuery = async (query) => {
      useStore.getState().setLoading(true)
      const response = await generateContent(query)
      useStore.getState().setPhotos(response.photos)
      useStore.getState().setLoading(false)
    }
    
    export const setLayout = (layout) => {
      useStore.getState().setLayout(layout)
    }
    """)
    
    print("\n🐍 Python Monad Style:")
    print("""
    # Functional pipeline
    result = (
        Monad('root')
        .pipe(create_root)
        .pipe(render_app)
        .pipe(init_store)
        .pipe(setup_ai)
        .pipe(send_query('winter'))
        .pipe(apply_layout('circle'))
    )
    """)
    
    print("\n🔄 Key Differences:")
    print("   • React: Imperative, stateful, component-based")
    print("   • Monad: Functional, immutable, pipeline-based")
    print("   • React: useStore.setState() mutates state")
    print("   • Monad: Each pipe() returns new state")
    print("   • React: Error boundaries for error handling")
    print("   • Monad: Built-in error propagation")

if __name__ == "__main__":
    main()
    show_comparison()
