<?php declare(strict_types=1);

namespace Shopware\Core\Profiling\Integration;

/**
 * @internal experimental atm
 */
class Tideways implements ProfilerInterface
{
    /**
     * @return mixed
     */
    public function trace(string $title, \Closure $closure, string $category, array $tags)
    {
        if (!class_exists('Tideways\Profiler')) {
            return $closure();
        }

        $tags = array_merge(['title' => $title], $tags);
        $span = \Tideways\Profiler::createSpan($category);
        $span->annotate($tags);

        $result = $closure();

        $span->finish();

        return $result;
    }
}
