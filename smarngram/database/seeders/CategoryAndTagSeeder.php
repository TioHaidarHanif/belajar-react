<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;
use App\Models\Tag;
use Illuminate\Support\Str;

class CategoryAndTagSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create categories
        $categories = [
            'Photography' => 'Share your best photos',
            'Travel' => 'Travel experiences and tips',
            'Food' => 'Delicious food and recipes',
            'Fitness' => 'Workout routines and health tips',
            'Technology' => 'Tech news and gadget reviews',
            'Art' => 'Artwork and creative projects',
            'Fashion' => 'Style trends and fashion tips',
            'Music' => 'Music discussion and recommendations',
        ];
        
        foreach ($categories as $name => $description) {
            Category::create([
                'name' => $name,
                'slug' => Str::slug($name),
                'description' => $description,
                'is_active' => true,
            ]);
        }
        
        // Create tags
        $tags = [
            'trending', 'popular', 'featured', 'new', 'recommended',
            'photography', 'nature', 'portrait', 'landscape', 'street',
            'travel', 'adventure', 'vacation', 'destination', 'holiday',
            'food', 'recipe', 'cooking', 'baking', 'restaurant',
            'fitness', 'workout', 'health', 'wellness', 'yoga',
            'tech', 'gadget', 'software', 'hardware', 'review',
            'art', 'drawing', 'painting', 'digital', 'illustration',
            'fashion', 'style', 'outfit', 'accessories', 'clothing',
            'music', 'song', 'album', 'artist', 'band',
        ];
        
        foreach ($tags as $name) {
            Tag::create([
                'name' => $name,
                'slug' => Str::slug($name),
            ]);
        }
    }
}
